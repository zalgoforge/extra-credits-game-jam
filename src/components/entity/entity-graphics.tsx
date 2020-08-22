import React from 'react';
import elfikGraphics from '../../assets/img/elfik.png';
import { Container, Sprite } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';
import { Token } from '../token';

interface Props {
  x?: number;
  y?: number;
  hp: number;
}

const ANCHOR_POINT = new PIXI.Point(0, 1);

export const EntityGraphics: React.FC<Props> = ({ x = 0, y = 0, hp }) => {
  return (
    <Container x={x} y={y}>
      <Sprite
        texture={PIXI.Texture.from(elfikGraphics)}
        width={300 / 3}
        height={400 / 3}
        anchor={ANCHOR_POINT}
      />
      <Token x={10} y={-10} counter={hp} type={'health'} />
    </Container>
  );
};
