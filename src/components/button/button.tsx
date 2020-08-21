import React from 'react';
import { Container, Sprite, Text } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';
import buttonGraphics from '../../assets/img/button.png';

interface Props {
  x: number;
  y: number;
  width: number;
  height: number;
  graphics: string;
  text: string;
  scale?: PIXI.Point;
  onDice?: () => void;
}

const BUTTON_TEXT_SPACER = 4;

export const Button: React.FC<Props> = ({ x, y, text, scale, width, height }) => {
  return (
    <Container x={x} y={y} scale={scale}>
      <Sprite
        texture={PIXI.Texture.from(buttonGraphics)}
        width={width}
        height={height}
        interactive={true}
        click={() => {
          console.log('clicked');
        }}
      />
      <Text
        x={5}
        text={text}
        height={height - BUTTON_TEXT_SPACER * 2}
        width={width - BUTTON_TEXT_SPACER * 2}
      />
    </Container>
  );
};
