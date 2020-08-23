import React from 'react';
import { Sprite, Container } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';
import planszaPoczatkowaGraphics from '../../assets/img/plansza_poczatkowa.png';
import { Rect } from '../rect';
import { AnimatedContainer } from '../animated-container';

interface Props {
  onComplete: () => void;
}
const mipmapOption = { mipmap: PIXI.MIPMAP_MODES.ON };
const ANCHOR_POINT = new PIXI.Point(0.5, 0.5);
const MAIN_SCREEN_SCALE = new PIXI.Point(0.5, 0.5);

export const StartingStage: React.FC<Props> = ({ onComplete }) => {
  return (
    <Container>
      <Rect width={1200} height={900} fill={0xffffff} />
      <AnimatedContainer x={0} y={0} duration={5000} alpha={1} initialAlpha={0}>
        <Sprite
          x={500}
          y={350}
          scale={MAIN_SCREEN_SCALE}
          texture={PIXI.Texture.from(planszaPoczatkowaGraphics, mipmapOption)}
          anchor={ANCHOR_POINT}
          interactive={true}
          click={onComplete}
        />
      </AnimatedContainer>
    </Container>
  );
};
