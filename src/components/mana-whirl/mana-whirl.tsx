import React from 'react';
import { Container, Sprite, Text } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';
import manaWhirlGraphics from '../../assets/img/mana_whirl.png';

interface Props {
  x?: number;
  y?: number;
  mana: number;
}

export const ManaWhirl: React.FC<Props> = ({ x = 0, y = 0, mana }) => {
  return (
    <Container x={x} y={y}>
      <Sprite width={402 / 2.2} height={406 / 2.2} texture={PIXI.Texture.from(manaWhirlGraphics)} />
      <Text x={20} y={20} text={`${mana}`} style={{ fontSize: 24, fill: 0xffffff }} />
    </Container>
  );
};
