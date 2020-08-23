import React from 'react';
import { Container, Text } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';
import { Rect } from '../rect';

interface Props {
  x?: number;
  y?: number;
  width: number;
  height: number;
  turnCount: number;
}

const ANCHOR_POINT = new PIXI.Point(0.5, 0.5);

export const GameOverScreen: React.FC<Props> = ({ x = 0, y = 0, width, height, turnCount = 0 }) => {
  return (
    <Container x={x} y={y}>
      <Rect width={width} height={height} fill={0x000000} />
      <Text
        x={width * 0.5}
        y={height * 0.5}
        text={`GAME OVER!\n You survived ${turnCount} turns!`}
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
