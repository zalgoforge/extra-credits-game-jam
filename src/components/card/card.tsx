import React from 'react';
import kartaTloGraphics from '../../assets/img/karta_tlo.png';
import kropkaGraphics from '../../assets/img/kropka.png';
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
  manaGain: number;
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
  manaGain,
  hasManaToPlay,
}) => {
  return (
    <Container x={x} y={y}>
      <Sprite texture={PIXI.Texture.from(kartaTloGraphics)} width={width} height={height} />
      {Array.from({ length: manaGain }).map((_, index) => {
        return (
          <Sprite
            key={`${index}`}
            x={width / 2 - (manaGain * 20) / 2 + index * 20}
            y={height * 0.58}
            texture={PIXI.Texture.from(kropkaGraphics)}
            width={40 / 2}
            height={36 / 2}
          />
        );
      })}
      <Text
        x={width * 0.1}
        y={height * 0.07}
        text={title}
        style={{ fontSize: 9, fill: 0xffffff }}
      />
      <Text
        x={12}
        y={height * 0.68}
        text={description}
        style={{ fontSize: 9, align: 'center', wordWrap: true, wordWrapWidth: 80 }}
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
