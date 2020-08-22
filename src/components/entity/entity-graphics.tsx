import React from 'react';
import elfikGraphics from '../../assets/img/elfik.png';
import ogrGraphics from '../../assets/img/ogr.png';
import { Container, Sprite } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';
import { Token } from '../token';

interface Props {
  x?: number;
  y?: number;
  hp: number;
  name: string;
}

const ANCHOR_POINT = new PIXI.Point(0, 1);

const nameToTextureMapping: any = {
  Enemy: PIXI.Texture.from(elfikGraphics),
  FastEnemy: PIXI.Texture.from(ogrGraphics),
  BigEnemy: PIXI.Texture.from(ogrGraphics),
};

const getEnemyTexture = (name: string) => {
  return nameToTextureMapping[name] || nameToTextureMapping.Enemy;
};

export const EntityGraphics: React.FC<Props> = ({ x = 0, y = 0, hp, name }) => {
  return (
    <Container x={x} y={y}>
      <Sprite
        texture={getEnemyTexture(name)}
        width={300 / 3}
        height={400 / 3}
        anchor={ANCHOR_POINT}
      />
      <Token x={10} y={-10} counter={hp} type={'health'} />
    </Container>
  );
};
