import React from 'react';
import { Container, Text } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';
import { Rect } from '../rect';

interface Props {
  score: number;
  onComplete: () => void;
}

const ANCHOR_POINT = new PIXI.Point(0.5, 0.5);

export const EndStage: React.FC<Props> = ({ score = 0, onComplete }) => {
  return (
    <Container>
      <Rect width={1200} height={900} fill={0x000000} interactive={true} onClick={onComplete} />
      <Text
        x={500}
        y={350}
        text={`GAME OVER!\n You survived ${score} turns!`}
        anchor={ANCHOR_POINT}
        style={{
          align: 'center',
          fontSize: 50,
          fill: 0x000000,
          stroke: 'white',
          strokeThickness: 4,
        }}
      />
    </Container>
  );
};
