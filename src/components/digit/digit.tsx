import React from 'react';
import { Sprite } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';
import digit0Graphics from '../../assets/img/digits/0.png';
import digit1Graphics from '../../assets/img/digits/1.png';
import digit2Graphics from '../../assets/img/digits/2.png';
import digit3Graphics from '../../assets/img/digits/3.png';
import digit4Graphics from '../../assets/img/digits/4.png';
import digit5Graphics from '../../assets/img/digits/5.png';
import digit6Graphics from '../../assets/img/digits/6.png';
import digit7Graphics from '../../assets/img/digits/7.png';
import digit8Graphics from '../../assets/img/digits/8.png';

interface Props {
  x?: number;
  y?: number;
  digit: number;
}

const digitToImgMap: any = {
  0: digit0Graphics,
  1: digit1Graphics,
  2: digit2Graphics,
  3: digit3Graphics,
  4: digit4Graphics,
  5: digit5Graphics,
  6: digit6Graphics,
  7: digit7Graphics,
  8: digit8Graphics,
};

const SCALE = new PIXI.Point(0.5, 0.5);

export const Digit: React.FC<Props> = ({ x = 0, y = 0, digit }) => {
  return digit <= 8 ? (
    <Sprite
      x={x}
      y={y}
      scale={SCALE}
      texture={PIXI.Texture.from(digitToImgMap[digit] || digit1Graphics)}
    />
  ) : null;
};
