import * as React from 'react';
import { Stage, Text, Container } from 'react-pixi-fiber';
import { hot } from 'react-hot-loader/root';
import { DraggableContainer } from '../draggable-container';
import * as PIXI from 'pixi.js';
import { DroppableContainer } from '../droppable-container';
import { State } from './types';
import { useEffect, useState } from 'react';
import { Button } from '../button';

import { GameState } from '../../game/game';
import { Background } from '../background';
import { EntityGraphics } from '../entity';
import { Card } from '../card';
import { Entity } from '../../game/entity';
import { Token } from '../token';

interface Props {
  app: PIXI.Application;
}

const HAND_Y_POSITION = 500;
const HAND_X_POSITION = 10;
const CARD_WIDTH = 100;
const CARD_HEIGHT = 180;
const CARD_SPACE_BETWEEN = 10;

const LANE_OFFSET = { x: 400, y: 220 };
const LANE_DIMENSIONS = { width: 700, height: 60 };
const LANE_SPACER = 10;
const LANE_SHIFT = 30;

const FIELD_WIDTH = 90;

const DISCARD_PILE = { x: 760, y: 500, width: 140, height: 140 };
const END_TURN_BUTTON = { x: 860, y: 460, width: 120, height: 30 };
const DO_CHEAT_BUTTON = { x: 860, y: 420, width: 120, height: 30 };

GameState.instance();

const getCards = () => {
  return GameState.instance().player.hand.cards.map((c) => ({
    id: c.uuid,
    title: c.title,
    description: c.description,
    cost: c.cost,
  }));
};

const getLanes = () => {
  return GameState.instance().board.lanes.map((l) => ({
    id: l.uuid,
    fields: l.fields.map((f) => ({
      id: f.uuid,
      enemies: f.entity()
        ? [
            {
              id: f.entity()!.uuid,
              hp: f.entity()!.hp.value(),
            },
          ]
        : [],
    })),
  }));
};

const getMana = () => {
  return GameState.instance().player.mana.value();
};

const getHealth = () => {
  return GameState.instance().player.entity.hp.value();
};

const StageComponent: React.FC<Props> = ({ app }) => {
  const [state, setState] = useState<State>({
    cards: getCards(),
    lanes: getLanes(),
    mana: getMana(),
    health: getHealth(),
    highlightedTargets: undefined,
    hoveredTarget: undefined,
  });

  useEffect(() => {
    GameState.instance()
      .player.hand.onCardsChanged.do(() => {
        setState((prev) => ({
          ...prev,
          cards: getCards(),
        }));
      })
      .bind();
    GameState.instance()
      .player.mana.onValueChanged.do(() => {
        setState((prev) => ({
          ...prev,
          mana: getMana(),
        }));
      })
      .bind();
    GameState.instance()
      .board.onEntityAdded.do(() => {
        setState((prev) => ({
          ...prev,
          lanes: getLanes(),
        }));
      })
      .bind();
    GameState.instance()
      .board.onEntityRemoved.do(() => {
        setState((prev) => ({
          ...prev,
          lanes: getLanes(),
        }));
      })
      .bind();
    Entity.onEntityHPChanged
      .do(() => {
        setState((prev) => ({
          ...prev,
          lanes: getLanes(),
        }));
      })
      .bind();
    Entity.onEntityHPChanged
      .do(() => {
        setState((prev) => ({
          ...prev,
          lanes: getLanes(),
        }));
      })
      .bind();
    Entity.onEntityMoved
      .do(() => {
        setState((prev) => ({
          ...prev,
          lanes: getLanes(),
        }));
      })
      .bind();
    GameState.instance()
      .player.entity.hp.onValueChanged.do(() => {
        setState((prev) => ({
          ...prev,
          health: getHealth(),
        }));
      })
      .bind();
  }, []);

  return (
    <Stage app={app}>
      <Background />
      <Token x={240} y={310} counter={state.mana} type={'mana'} />
      <Token x={280} y={310} counter={state.health} type={'health'} />
      <DroppableContainer
        x={0}
        y={0}
        width={1000}
        height={500}
        debugColor={0x333333}
        acceptTags={['board-targatable']}
        alpha={0}
        onDrop={({ cardId }) => {
          GameState.instance().playCard(cardId, GameState.instance().board.uuid);
        }}
      />
      {state.lanes.map(({ id, fields }, index) => (
        <DroppableContainer
          key={id}
          x={LANE_OFFSET.x - index * LANE_SHIFT}
          y={LANE_OFFSET.y + index * (LANE_DIMENSIONS.height + LANE_SPACER)}
          width={LANE_DIMENSIONS.width}
          height={LANE_DIMENSIONS.height}
          acceptTags={['lane-targatable']}
          alpha={
            state.hoveredTarget === id
              ? 1
              : state.highlightedTargets && !state.highlightedTargets.includes(id)
              ? 0.3
              : 0
          }
          onDrop={({ cardId }) => {
            GameState.instance().playCard(cardId, id);
          }}
          onDragEnter={() => {
            console.log('on drag enter');
            setState((prev) => ({
              ...prev,
              hoveredTarget: id,
            }));
          }}
          onDragLeave={() => {
            console.log('on drag leave');
            setState((prev) => ({
              ...prev,
              hoveredTarget: undefined,
            }));
          }}
        />
      ))}
      {state.lanes
        .map(({ fields }, laneIndex) =>
          fields
            .slice()
            .reverse()
            .map(({ id }, index) => {
              const reverseIndex = fields.length - index;
              return (
                <DroppableContainer
                  key={id}
                  x={LANE_OFFSET.x - laneIndex * LANE_SHIFT + FIELD_WIDTH * reverseIndex}
                  y={LANE_OFFSET.y + laneIndex * (LANE_DIMENSIONS.height + LANE_SPACER) + 6}
                  width={88}
                  height={48}
                  acceptTags={['field-targatable']}
                  alpha={
                    state.highlightedTargets && !state.highlightedTargets.includes(id) ? 0.2 : 0
                  }
                  debugColor={0x0099ee}
                  onDrop={({ cardId }) => {
                    GameState.instance().playCard(cardId, id);
                  }}
                />
              );
            })
        )
        .flat(1)}
      {state.lanes
        .map(({ fields }, laneIndex) =>
          fields
            .slice()
            .reverse()
            .map(({ id, enemies }, index) => {
              const reverseIndex = fields.length - index;
              return enemies.length ? (
                <Container
                  key={id}
                  x={LANE_OFFSET.x - laneIndex * LANE_SHIFT + FIELD_WIDTH * reverseIndex}
                  y={LANE_OFFSET.y + laneIndex * (LANE_DIMENSIONS.height + LANE_SPACER) + 40}
                >
                  <EntityGraphics hp={enemies[0].hp} />
                </Container>
              ) : null;
            })
            .filter((e) => !!e)
        )
        .flat(1)}
      <DroppableContainer
        {...DISCARD_PILE}
        debugColor={0xdd1111}
        acceptTags={['board-targatable', 'lane-targatable', 'field-targatable']}
        onDrop={({ cardId }) => {
          GameState.instance().discardCard(cardId);
        }}
      >
        <Text text={'Discard here'} style={{ fontSize: 10 }} />
      </DroppableContainer>
      {state.cards.map(({ id, title, description, cost }, index) => {
        const targets = GameState.instance().getPossibleTargetsForCard(id);
        const boardLaneIds = GameState.instance().board.lanes.map((l) => l.uuid);
        const fieldIds = GameState.instance()
          .board.lanes.map((l) => l.fields.map((f) => f.uuid))
          .flat(1);
        const canTargetBoard = targets.find((t) => t === GameState.instance().board.uuid);
        const canTargetLane = targets.some((t) => boardLaneIds.includes(t));
        const canTargetField = targets.some((t) => fieldIds.includes(t));
        const tags = [
          ...(canTargetBoard ? ['board-targatable'] : []),
          ...(canTargetLane ? ['lane-targatable'] : []),
          ...(canTargetField ? ['field-targatable'] : []),
        ];
        return (
          <DraggableContainer
            key={id}
            app={app}
            transferObject={{ cardId: id }}
            tags={tags}
            x={HAND_X_POSITION + (CARD_WIDTH + CARD_SPACE_BETWEEN) * index}
            y={HAND_Y_POSITION}
            onDragStart={() => {
              setState((prev) => ({
                ...prev,
                highlightedTargets: GameState.instance().getPossibleTargetsForCard(id),
              }));
            }}
            onDragStop={() => {
              setState((prev) => ({
                ...prev,
                highlightedTargets: undefined,
              }));
            }}
          >
            <Card
              width={CARD_WIDTH}
              height={CARD_HEIGHT}
              title={title}
              description={description}
              cost={cost}
            />
          </DraggableContainer>
        );
      })}

      <Button
        {...END_TURN_BUTTON}
        text={'Do Cheat'}
        graphics={'button.png'}
        onClick={() => {
          GameState.instance().doCheat('');
        }}
      />
      <Button
        {...DO_CHEAT_BUTTON}
        text={'Next Turn'}
        graphics={'button.png'}
        onClick={() => {
          GameState.instance().endTurn();
        }}
      />
    </Stage>
  );
};

export const MainStage = hot(StageComponent);
