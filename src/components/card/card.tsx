import React from 'react';
import kartaTloGraphics from '../../assets/img/karta_tlo.png';
import kropkaGraphics from '../../assets/img/kropka.png';
import rockGraphics from '../../assets/img/rock.png';
import waterPistolGraphics from '../../assets/img/water_pistol.png';
import waterBallonGraphics from '../../assets/img/water_baloon.png';
import bearTrapGraphics from '../../assets/img/beartrap_card.png';
import { Container, Sprite, Text } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';

interface Props {
  x?: number;
  y?: number;
  nameId: string;
  width: number;
  height: number;
  title: string;
  description: string;
  cost: number;
  manaGain: number;
  hasManaToPlay: boolean;
}

const ANCHOR_POINT = new PIXI.Point(0.5, 0.5);

const nameIdImgMap: any = {
  rock: {
    texture: PIXI.Texture.from(rockGraphics),
  },
  ['water-pistol']: {
    texture: PIXI.Texture.from(waterPistolGraphics),
  },
  ['water-ballon']: {
    texture: PIXI.Texture.from(waterBallonGraphics),
  },
  ['bear-trap']: {
    texture: PIXI.Texture.from(bearTrapGraphics),
  },
};

export const Card: React.FC<Props> = ({
  x = 0,
  y = 0,
  nameId,
  width,
  height,
  title,
  description,
  cost,
  manaGain,
  hasManaToPlay,
}) => {
  console.log(nameId);
  return (
    <Container x={x} y={y}>
      <Sprite texture={PIXI.Texture.from(kartaTloGraphics)} width={width} height={height} />
      {nameIdImgMap[nameId] ? (
        <Sprite
          x={width * 0.048}
          y={width * 0.2}
          texture={nameIdImgMap[nameId].texture}
          width={width * 0.9}
          height={width * 0.9}
        />
      ) : null}
      {Array.from({ length: manaGain }).map((_, index) => {
        return (
          <Sprite
            key={`${index}`}
            x={width / 2 - (manaGain * 20) / 2 + index * 20}
            y={height * 0.92}
            texture={PIXI.Texture.from(kropkaGraphics)}
            width={40 / 2}
            height={36 / 2}
          />
        );
      })}
      {!nameIdImgMap[nameId] ? (
        <Text
          x={width * 0.5}
          y={height * 0.62}
          text={title}
          resolution={8}
          anchor={ANCHOR_POINT}
          style={{
            align: 'center',
            fontSize: 14,
            fill: 0xffffff,
            stroke: 'black',
            strokeThickness: 5,
          }}
        />
      ) : null}
      <Text
        x={width * 0.135}
        y={height * 0.68}
        text={description}
        resolution={8}
        style={{
          fontSize: 10,
          align: 'center',
          fontWeight: 'bold',
          wordWrap: true,
          wordWrapWidth: width * 0.75,
        }}
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
