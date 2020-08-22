import * as React from 'react';
import { Stage, Text } from 'react-pixi-fiber';
import { hot } from 'react-hot-loader/root';
import { DraggableContainer } from '../draggable-container';
import * as PIXI from 'pixi.js';
import { DroppableContainer } from '../droppable-container';
import { State } from './types';
import { useEffect, useState } from 'react';
import { Rect } from '../rect';
import { Button } from '../button';

import { GameState } from '../../game/game';
import { Background } from '../background';

interface Props {
  app: PIXI.Application;
}

const HAND_Y_POSITION = 500;
const HAND_X_POSITION = 10;
const CARD_WIDTH = 100;
const CARD_HEIGHT = 180;
const CARD_SPACE_BETWEEN = 10;

const LANE_OFFSET = { x: 420, y: 220 };
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
    })),
  }));
};

const getMana = () => {
  return GameState.instance().player.mana.value();
};

const StageComponent: React.FC<Props> = ({ app }) => {
  const [state, setState] = useState<State>({
    cards: getCards(),
    lanes: getLanes(),
    mana: getMana(),
    highlightedTargets: undefined,
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
  }, []);

  return (
    <Stage app={app}>
      <Background />
      <Text x={10} y={10} text={`${state.mana}`} style={{ fontSize: 32 }} />
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
          alpha={state.highlightedTargets && !state.highlightedTargets.includes(id) ? 0.2 : 0.4}
          onDrop={({ cardId }) => {
            GameState.instance().playCard(cardId, id);
          }}
        />
      ))}
      {state.lanes
        .map(({ fields }, laneIndex) =>
          fields.map(({ id }, index) => (
            <DroppableContainer
              key={id}
              x={LANE_OFFSET.x - laneIndex * LANE_SHIFT + 6 + FIELD_WIDTH * index}
              y={LANE_OFFSET.y + laneIndex * (LANE_DIMENSIONS.height + LANE_SPACER) + 6}
              width={88}
              height={48}
              acceptTags={['field-targatable']}
              alpha={state.highlightedTargets && !state.highlightedTargets.includes(id) ? 0.2 : 0.4}
              debugColor={0x0099ee}
              onDrop={({ cardId }) => {
                GameState.instance().playCard(cardId, id);
              }}
            />
          ))
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
            <Rect width={CARD_WIDTH} height={CARD_HEIGHT} fill={0xeeff00} />
            <Text x={3} y={3} text={title} style={{ fontSize: 9 }} />
            <Text
              x={80}
              y={30}
              text={tags.map((t) => t.slice(0, 1)).join(',')}
              style={{ fontSize: 9 }}
            />
            <Text x={3} y={80} text={description} style={{ fontSize: 9 }} />
            <Text x={80} y={3} text={`${cost}`} style={{ fontSize: 20 }} />
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
