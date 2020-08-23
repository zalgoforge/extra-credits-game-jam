import React from 'react';
import kartaTloGraphics from '../../assets/img/karta_tlo.png';
import kropkaGraphics from '../../assets/img/kropka.png';
import rockGraphics from '../../assets/img/cards/rock.png';
import waterPistolGraphics from '../../assets/img/cards/water_pistol.png';
import waterBallonGraphics from '../../assets/img/cards/water_baloon.png';
import bearTrapGraphics from '../../assets/img/cards/beartrap_card.png';
import electricEel from '../../assets/img/cards/electric_eel.png';
import puddle from '../../assets/img/cards/puddle.png';
import schaden from '../../assets/img/cards/schaden.png';

import strategize from '../../assets/img/cards/strategize.png';
import dubstep from '../../assets/img/cards/dubstep.png';
import depressite from '../../assets/img/cards/depressite.png';
import numerology from '../../assets/img/cards/numerology.png';

import rations from '../../assets/img/cards/rations.png';
import poisonJar from '../../assets/img/cards/jar.png';

import droneStrike from '../../assets/img/cards/drone_strike.png';
import grumble from '../../assets/img/cards/grumble.png';
import teen_poetry from '../../assets/img/cards/teen_poetry.png';

import { Container, Sprite, Text } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';
import { Digit } from '../digit';

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
  ['electric-eel']: {
    texture: PIXI.Texture.from(electricEel),
  },
  ['puddle']: {
    texture: PIXI.Texture.from(puddle),
  },
  ['schadenfreude']: {
    texture: PIXI.Texture.from(schaden),
  },
  ['strategize']: {
    texture: PIXI.Texture.from(strategize),
  },
  ['dubstep']: {
    texture: PIXI.Texture.from(dubstep),
  },
  ['depressite']: {
    texture: PIXI.Texture.from(depressite),
  },
  ['numerology']: {
    texture: PIXI.Texture.from(numerology),
  },
  ['rations']: {
    texture: PIXI.Texture.from(rations),
  },
  ['poison-jar']: {
    texture: PIXI.Texture.from(poisonJar),
  },
  ['teen-poetry']: {
    texture: PIXI.Texture.from(teen_poetry),
  },
  ['grumble']: {
    texture: PIXI.Texture.from(grumble),
  },
  ['drone-strike']: {
    texture: PIXI.Texture.from(droneStrike),
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
      <Digit
        x={width * 0.75}
        y={height * 0.06}
        digit={cost}
        tint={hasManaToPlay ? 0xffffff : 0xff0000}
      />
    </Container>
  );
};
