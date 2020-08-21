import * as React from 'react';
import { Stage } from 'react-pixi-fiber';
import { hot } from 'react-hot-loader/root';
import { DraggableContainer } from '../draggable-container';
import * as PIXI from 'pixi.js';
import { DroppableContainer } from '../droppable-container';
import { State } from './types';
import { useState } from 'react';
import { Rect } from '../rect';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  app: PIXI.Application;
}

const HAND_Y_POSITION = 500;
const HAND_X_POSITION = 300;
const CARD_WIDTH = 100;
const CARD_HEIGHT = 180;
const CARD_SPACE_BETWEEN = 10;

const StageComponent: React.FC<Props> = ({ app }) => {
  const [state] = useState<State>({
    cards: [{ id: uuidv4() }, { id: uuidv4() }],
  });

  return (
    <Stage app={app}>
      <DroppableContainer
        x={300}
        y={100}
        width={100}
        height={100}
        onDrop={(transferObject) => {
          console.log(transferObject);
        }}
      />
      {state.cards.map((card, index) => (
        <DraggableContainer
          key={card.id}
          app={app}
          transferObject={{}}
          x={HAND_X_POSITION + (CARD_WIDTH + CARD_SPACE_BETWEEN) * index}
          y={HAND_Y_POSITION}
        >
          <Rect width={CARD_WIDTH} height={CARD_HEIGHT} fill={0xeeff00} />
        </DraggableContainer>
      ))}
    </Stage>
  );
};

export const MainStage = hot(StageComponent);
