import React from 'react';
import { Container, Text } from 'react-pixi-fiber';
import { Rect } from '../rect';

interface Props {
  x?: number;
  y?: number;
  counter: number;
  type: 'health' | 'mana';
}

const typeToFillMap = {
  health: 0xff0000,
  mana: 0x0000ff,
};

export const Token: React.FC<Props> = ({ x = 0, y = 0, counter, type }) => {
  return (
    <Container x={x} y={y}>
      <Rect width={32} height={32} fill={typeToFillMap[type]} />
      <Text x={5} y={5} text={`${counter}`} style={{ fontSize: 24, fill: 0xffffff }} />
    </Container>
  );
};
