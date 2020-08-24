import * as React from 'react';
import { Sprite, Text, Container } from 'react-pixi-fiber';
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
import { HpIndicator } from '../hp-indicator';
import { AnimatedContainer } from '../animated-container';
import { ManaWhirl } from '../mana-whirl';
import { ObjectGraphics } from '../object-graphics';
import { Status } from '../../game/status';
import passiveGraphics from '../../assets/img/sfx/passive.png';
import { SayingsGraphics } from '../entity-graphics/sayings-graphics';

interface Props {
  app: PIXI.Application;
  onComplete: (score: number) => void;
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
    nameId: c.id,
    title: c.title,
    description: c.description,
    cost: c.cost,
    manaGain: c.manaGain,
  }));
};

const getPassives = () => {
  return GameState.instance()
    .passiveEffects.cards.filter((c) => c.passiveDescription != '')
    .map((c) => ({
      id: c.uuid,
      description: c.passiveDescription,
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
              isSoaked: f.entity()!.statuses.getValue(Status.Soak) !== 0,
              soaked: f.entity()!.statuses.getValue(Status.Soak),
              tough: f.entity()!.statuses.getValue(Status.Tough),
              isPoisoned: f.entity()!.statuses.getValue(Status.Poison) !== 0,
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

const getTurnCount = () => {
  return GameState.instance().turnCount.value();
};

const getDyingEnemies = () => {
  return GameState.instance().board.recentlyDestroyedEntities.map((e) => ({
    id: e.uuid,
    laneIndex: e.field()!.laneIdx,
    fieldIndex: e.field()!.fieldIdx,
    name: e.name,
  }));
};

export const MainStage: React.FC<Props> = ({ app, onComplete }) => {
  const [state, setState] = useState<State>({
    cards: getCards(),
    lanes: getLanes(),
    mana: getMana(),
    health: getHealth(),
    turnCount: getTurnCount(),
    dyingEnemies: getDyingEnemies(),
    passives: getPassives(),
    highlightedTargets: undefined,
    hoveredTarget: undefined,
  });

  useEffect(() => {
    const game = GameState.instance();

    game.player.hand.onCardsChanged
      .do(() => {
        setState((prev) => ({
          ...prev,
          cards: getCards(),
        }));
      })
      .bind();
    game.passiveEffects.onCardsChanged
      .do(() => {
        setState((prev) => ({
          ...prev,
          passives: getPassives(),
        }));
      })
      .bind();
    game.player.mana.onValueChanged
      .do(() => {
        setState((prev) => ({
          ...prev,
          mana: getMana(),
        }));
      })
      .bind();
    game.player.entity.hp.onValueChanged
      .do(() => {
        setState((prev) => ({
          ...prev,
          health: getHealth(),
        }));
      })
      .bind();
    game.onGameOver
      .do(() => {
        onComplete(getTurnCount());
      })
      .bind();
    game.turnCount.onValueChanged
      .do(() => {
        setState((prev) => ({
          ...prev,
          turnCount: getTurnCount(),
        }));
      })
      .bind();

    let updateLanes = () => {
      setState((prev) => ({
        ...prev,
        lanes: getLanes(),
      }));
    };

    game.board.onEntityAdded.do(updateLanes).bind();
    game.board.onEntityRemoved
      .do(() => {
        setState((prev) => ({
          ...prev,
          lanes: getLanes(),
          dyingEnemies: getDyingEnemies(),
        }));
      })
      .bind();
    game.board.onCardAdded.do(updateLanes).bind();
    game.board.onCardRemoved.do(updateLanes).bind();

    Entity.onEntityHPChanged.do(updateLanes).bind();
    Entity.onEntityMoved.do(updateLanes).bind();
    Entity.onEntityStatusChanged.do(updateLanes).bind();
  }, []);

  return (
    <Container>
      <Background />
      <Text x={500} y={10} text={`Turn count: ${state.turnCount}`} />
      <HpIndicator x={220} y={233} counter={state.health} />
      <DroppableContainer
        x={0}
        y={0}
        width={1200}
        height={470}
        debugColor={0x0099ee}
        acceptTags={['board-targatable']}
        alpha={
          state.hoveredTarget === GameState.instance().board.uuid
            ? 1
            : state.highlightedTargets &&
              state.highlightedTargets.includes(GameState.instance().board.uuid)
            ? 0.3
            : 0
        }
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
          debugColor={0x0099ee}
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
      {/* Dying Enemies */}
      {state.dyingEnemies.map(({ id, name, laneIndex, fieldIndex }) => {
        return (
          <EntityGraphics
            key={id}
            x={LANE_OFFSET.x - laneIndex * LANE_SHIFT + FIELD_WIDTH * fieldIndex + FIELD_WIDTH / 2}
            y={LANE_OFFSET.y + laneIndex * (LANE_DIMENSIONS.height + LANE_SPACER) + 40}
            isSoaked={false}
            soaked={0}
            tough={0}
            isPoisoned={false}
            isDying={true}
            hp={0}
            name={name}
          />
        );
      })}
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
                  x={
                    LANE_OFFSET.x -
                    laneIndex * LANE_SHIFT +
                    FIELD_WIDTH * reverseIndex +
                    FIELD_WIDTH / 2
                  }
                  y={LANE_OFFSET.y + laneIndex * (LANE_DIMENSIONS.height + LANE_SPACER) + 40}
                  isSoaked={enemies[0].isSoaked}
                  soaked={enemies[0].soaked}
                  tough={enemies[0].tough}
                  isPoisoned={enemies[0].isPoisoned}
                  isDying={false}
                  hp={enemies[0].hp}
                  name={enemies[0].name}
                />
              ) : null;
            })
            .filter((e) => !!e)
        )
        .flat(1)}
      {/* Sayings */}
      {state.lanes
        .map(({ fields }, laneIndex) =>
          fields
            .slice()
            .reverse()
            .map(({ id, enemies }, index) => {
              const reverseIndex = fields.length - index;
              return enemies.length ? (
                <SayingsGraphics
                  key={enemies[0].id}
                  x={
                    LANE_OFFSET.x -
                    laneIndex * LANE_SHIFT +
                    FIELD_WIDTH * reverseIndex +
                    FIELD_WIDTH / 2
                  }
                  y={LANE_OFFSET.y + laneIndex * (LANE_DIMENSIONS.height + LANE_SPACER) + 40}
                  isDying={false}
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
      {/* passives */}
      {state.passives.map(({ id, description }, index) => {
        return (
          <Container key={id} x={10 + 110 * index} y={420} width={100} height={50} alpha={1}>
            <Sprite texture={PIXI.Texture.from(passiveGraphics)} y={-1} />
            <Text
              key={id}
              text={`${description}`}
              x={5}
              y={5}
              style={{
                fontSize: 10,
                fontWeight: 'bold',
                wordWrap: true,
                wordWrapWidth: 90,
              }}
            />
          </Container>
        );
      })}
      {state.cards.map(({ id, title, description, cost, manaGain, nameId }, index) => {
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
                nameId={nameId}
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
    </Container>
  );
};
