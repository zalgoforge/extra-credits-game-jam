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

interface Props {
  app: PIXI.Application;
}

const HAND_Y_POSITION = 500;
const HAND_X_POSITION = 10;
const CARD_WIDTH = 100;
const CARD_HEIGHT = 180;
const CARD_SPACE_BETWEEN = 10;

const LANE_OFFSET = { x: 10, y: 120 };
const LANE_DIMENSIONS = { width: 600, height: 60 };
const LANE_SPACER = 10;

const DISCARD_PILE = { x: 760, y: 500, width: 140, height: 140 };
const END_TURN_BUTTON = { x: 860, y: 460, width: 120, height: 30 };

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
      <Text x={10} y={10} text={`${state.mana}`} style={{ fontSize: 32 }} />
      {state.lanes.map(({ id, fields }, index) => (
        <DroppableContainer
          key={id}
          x={LANE_OFFSET.x}
          y={LANE_OFFSET.y + index * (LANE_DIMENSIONS.height + LANE_SPACER)}
          width={LANE_DIMENSIONS.width}
          height={LANE_DIMENSIONS.height}
          onDrop={({ cardId }) => {
            GameState.instance().playCard(cardId, '');
          }}
        >
          {fields.map(({ id }, index) => (
            <DroppableContainer
              key={id}
              x={6 + 90 * index}
              y={6}
              width={88}
              height={48}
              debugColor={0x0099ee}
              onDrop={() => {}}
            />
          ))}
        </DroppableContainer>
      ))}
      <DroppableContainer
        {...DISCARD_PILE}
        debugColor={0xdd1111}
        onDrop={({ cardId }) => {
          GameState.instance().discardCard(cardId);
        }}
      >
        <Text text={'Discard here'} style={{ fontSize: 10 }} />
      </DroppableContainer>
      {state.cards.map(({ id, title, description, cost }, index) => (
        <DraggableContainer
          key={id}
          app={app}
          transferObject={{ cardId: id }}
          x={HAND_X_POSITION + (CARD_WIDTH + CARD_SPACE_BETWEEN) * index}
          y={HAND_Y_POSITION}
        >
          <Rect width={CARD_WIDTH} height={CARD_HEIGHT} fill={0xeeff00} />
          <Text x={3} y={3} text={title} style={{ fontSize: 9 }} />
          <Text x={3} y={80} text={description} style={{ fontSize: 9 }} />
          <Text x={80} y={3} text={`${cost}`} style={{ fontSize: 20 }} />
        </DraggableContainer>
      ))}
      <Button
        {...END_TURN_BUTTON}
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
