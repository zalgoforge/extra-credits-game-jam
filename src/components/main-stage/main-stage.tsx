import * as React from 'react';
import { Stage } from 'react-pixi-fiber';
import { hot } from 'react-hot-loader/root';
import { DraggableContainer } from '../draggable-container';
import * as PIXI from 'pixi.js';
import { DroppableContainer } from '../droppable-container';
import { State } from './types';
import { useEffect, useState } from 'react';
import { Button } from '../button';

import { GameState } from '../../game/game';
import { Background } from '../background';
import { EntityGraphics } from '../entity-graphics';
import { Card } from '../card';
import { Entity } from '../../game/entity';
import { Token } from '../token';
import { AnimatedContainer } from '../animated-container';
import { ManaWhirl } from '../mana-whirl';
import { ObjectGraphics } from '../object-graphics';

interface Props {
  app: PIXI.Application;
}

const HAND_Y_POSITION = 480;
const HAND_X_POSITION = 10;
const CARD_WIDTH = 115;
const CARD_HEIGHT = 180;
const CARD_SPACE_BETWEEN = 5;

const LANE_OFFSET = { x: 400, y: 220 };
const LANE_DIMENSIONS = { width: 700, height: 60 };
const LANE_SPACER = 10;
const LANE_SHIFT = 30;

const FIELD_WIDTH = 90;

const DISCARD_PILE = { x: 730, y: 480, width: 180, height: 180 };
const END_TURN_BUTTON = { x: 960, y: 590 };

GameState.instance();

const getCards = () => {
  return GameState.instance().player.hand.cards.map((c) => ({
    id: c.uuid,
    title: c.title,
    description: c.description,
    cost: c.cost,
    manaGain: c.manaGain,
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
              name: f.entity()!.name,
            },
          ]
        : [],
      objects: f.card()
        ? [
            {
              id: f.card()!.uuid,
              nameId: f.card()!.id,
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
    GameState.instance()
      .board.onCardAdded.do(() => {
        setState((prev) => ({
          ...prev,
          lanes: getLanes(),
        }));
      })
      .bind();
  }, []);

  return (
    <Stage app={app}>
      <Background />
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
          debugColor={0x00ff00}
          acceptTags={['lane-targatable']}
          alpha={
            state.hoveredTarget === id
              ? 1
              : state.highlightedTargets && state.highlightedTargets.includes(id)
              ? 0.3
              : 0
          }
          onDrop={({ cardId }) => {
            GameState.instance().playCard(cardId, id);
          }}
          onDragEnter={() => {
            setState((prev) => ({
              ...prev,
              hoveredTarget: id,
            }));
          }}
          onDragLeave={() => {
            setState((prev) => ({
              ...prev,
              hoveredTarget: undefined,
            }));
          }}
        />
      ))}
      {/* fields */}
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
                    state.hoveredTarget === id
                      ? 1
                      : state.highlightedTargets && state.highlightedTargets.includes(id)
                      ? 0.3
                      : 0
                  }
                  onDragEnter={() => {
                    setState((prev) => ({
                      ...prev,
                      hoveredTarget: id,
                    }));
                  }}
                  onDragLeave={() => {
                    setState((prev) => ({
                      ...prev,
                      hoveredTarget: undefined,
                    }));
                  }}
                  debugColor={0x0099ee}
                  onDrop={({ cardId }) => {
                    GameState.instance().playCard(cardId, id);
                  }}
                />
              );
            })
        )
        .flat(1)}
      {/* objects */}
      {state.lanes
        .map(({ fields }, laneIndex) =>
          fields
            .slice()
            .reverse()
            .map(({ id, objects }, index) => {
              const reverseIndex = fields.length - index;
              return objects.length ? (
                <ObjectGraphics
                  key={objects[0].id}
                  x={LANE_OFFSET.x - laneIndex * LANE_SHIFT + FIELD_WIDTH * reverseIndex}
                  y={LANE_OFFSET.y + laneIndex * (LANE_DIMENSIONS.height + LANE_SPACER) + 40}
                  nameId={objects[0].nameId}
                />
              ) : null;
            })
            .filter((e) => !!e)
        )
        .flat(1)}
      {/* Enemies */}
      {state.lanes
        .map(({ fields }, laneIndex) =>
          fields
            .slice()
            .reverse()
            .map(({ id, enemies }, index) => {
              const reverseIndex = fields.length - index;
              return enemies.length ? (
                <EntityGraphics
                  key={enemies[0].id}
                  x={LANE_OFFSET.x - laneIndex * LANE_SHIFT + FIELD_WIDTH * reverseIndex}
                  y={LANE_OFFSET.y + laneIndex * (LANE_DIMENSIONS.height + LANE_SPACER) + 40}
                  hp={enemies[0].hp}
                  name={enemies[0].name}
                />
              ) : null;
            })
            .filter((e) => !!e)
        )
        .flat(1)}
      <DroppableContainer
        {...DISCARD_PILE}
        acceptTags={['board-targatable', 'lane-targatable', 'field-targatable']}
        debugColor={0x00ff00}
        alpha={state.highlightedTargets ? 0.3 : 0}
        onDrop={({ cardId }) => {
          GameState.instance().discardCard(cardId);
        }}
      />
      <ManaWhirl x={DISCARD_PILE.x} y={DISCARD_PILE.y} mana={state.mana} />
      {state.cards.map(({ id, title, description, cost, manaGain }, index) => {
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
            <AnimatedContainer initialY={-20} x={0} y={0}>
              <Card
                width={CARD_WIDTH}
                height={CARD_HEIGHT}
                title={title}
                description={description}
                cost={cost}
                manaGain={manaGain}
                hasManaToPlay={cost <= state.mana}
              />
            </AnimatedContainer>
          </DraggableContainer>
        );
      })}
      <Button
        {...END_TURN_BUTTON}
        type={'next-turn'}
        onClick={() => {
          GameState.instance().endTurn();
        }}
      />
    </Stage>
  );
};

export const MainStage = hot(StageComponent);
