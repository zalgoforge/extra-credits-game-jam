import React from 'react';
import { Sprite, Container } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';
import bearTrapGraphics from '../../assets/img/bear_trap.png';
import kaluzaGraphics from '../../assets/img/kaluza.png';

interface Props {
  x?: number;
  y?: number;
  nameId: string;
}

const ANCHOR_POINT = new PIXI.Point(0, 0.5);
const mipmapOption = { mipmap: PIXI.MIPMAP_MODES.ON };

const nameIdToTexture: any = {
  ['bear-trap']: PIXI.Texture.from(bearTrapGraphics, mipmapOption),
  ['puddle']: PIXI.Texture.from(kaluzaGraphics, mipmapOption),
};

export const ObjectGraphics: React.FC<Props> = ({ x = 0, y = 0, nameId }) => {
  const tex = nameIdToTexture[nameId] || nameIdToTexture.puddle;
  return (
    <Container x={x} y={y}>
      <Sprite texture={tex} width={tex.width / 4} height={tex.height / 4} anchor={ANCHOR_POINT} />
    </Container>
  );
};
