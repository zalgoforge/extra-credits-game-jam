import React from 'react';
import kartaTloGraphics from '../../assets/img/karta_tlo.png';
import { Container, Sprite, Text } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';

interface Props {
  x?: number;
  y?: number;
  width: number;
  height: number;
  title: string;
  description: string;
  cost: number;
  hasManaToPlay: boolean;
}

export const Card: React.FC<Props> = ({
  x = 0,
  y = 0,
  width,
  height,
  title,
  description,
  cost,
  hasManaToPlay,
}) => {
  return (
    <Container x={x} y={y}>
      <Sprite texture={PIXI.Texture.from(kartaTloGraphics)} width={width} height={height} />
      <Text
        x={width * 0.1}
        y={height * 0.07}
        text={title}
        style={{ fontSize: 9, fill: 0xffffff }}
      />
      <Text
        x={20}
        y={height * 0.7}
        text={description}
        style={{ fontSize: 9, align: 'center', wordWrap: true, wordWrapWidth: 70 }}
      />
      <Text
        x={width * 0.77}
        y={height * 0.05}
        text={`${cost}`}
        style={{ fontSize: 20, fill: hasManaToPlay ? 0x111111 : 0xff0000 }}
      />
    </Container>
  );
};
