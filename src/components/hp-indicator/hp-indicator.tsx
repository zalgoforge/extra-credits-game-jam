import React from 'react';
import { Container, Sprite } from 'react-pixi-fiber';
import { Rect } from '../rect';
import * as PIXI from 'pixi.js';
import hpProgramistyGraphics from '../../assets/img/hp_programisty.png';

interface Props {
  x?: number;
  y?: number;
  counter: number;
}

export const HpIndicator: React.FC<Props> = ({ x = 0, y = 0, counter }) => {
  const barWidth = 253 / 2;
  const barHeight = 19 / 2;
  return (
    <Container x={x} y={y}>
      <Rect width={barWidth} height={barHeight} fill={0xff0000} />
      <Rect width={barWidth * (counter / 10)} height={barHeight} fill={0x00dd00} />
      <Sprite
        width={barWidth}
        height={barHeight}
        texture={PIXI.Texture.from(hpProgramistyGraphics)}
      />
    </Container>
  );
};
