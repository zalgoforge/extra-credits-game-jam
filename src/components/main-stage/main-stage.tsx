import * as React from 'react';
import { Stage, Text } from 'react-pixi-fiber';
import { hot } from 'react-hot-loader/root';
import { DraggableContainer } from '../draggable-container';
import * as PIXI from 'pixi.js';
import { DroppableContainer } from '../droppable-container';
import { State } from './types';
import { useState } from 'react';
import { Rect } from '../rect';
import { v4 as uuidv4 } from 'uuid';
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

const END_TURN_BUTTON = { x: 860, y: 460, width: 120, height: 30 };

GameState.instance();

const StageComponent: React.FC<Props> = ({ app }) => {
  const [state] = useState<State>({
    cards: GameState.instance().player.deck.cards.map((c) => ({
      id: c.uuid,
      title: c.title,
      description: c.description,
      cost: c.cost,
    })),
    lanes: [
      { id: 'lane1', slots: [{ id: 'slot1' }, { id: 'slot2' }, { id: 'slot3' }, { id: 'slot1' }] },
      { id: 'lane2', slots: [{ id: 'slot1' }, { id: 'slot2' }, { id: 'slot3' }, { id: 'slot1' }] },
      { id: 'lane3', slots: [{ id: 'slot1' }, { id: 'slot2' }, { id: 'slot3' }, { id: 'slot1' }] },
    ],
  });

  return (
    <Stage app={app}>
      {state.lanes.map(({ id }, index) => (
        <DroppableContainer
          key={id}
          x={LANE_OFFSET.x}
          y={LANE_OFFSET.y + index * (LANE_DIMENSIONS.height + LANE_SPACER)}
          width={LANE_DIMENSIONS.width}
          height={LANE_DIMENSIONS.height}
          onDrop={(transferObject) => {
            console.log(transferObject);
          }}
        />
      ))}
      {state.cards.map(({ id, title, description, cost }, index) => (
        <DraggableContainer
          key={id}
          app={app}
          transferObject={{}}
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
