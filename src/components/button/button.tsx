import React, { useState } from 'react';
import { Container, Sprite } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';
import buttonGraphics from '../../assets/img/button.png';
import nextTurnButtonGraphics from '../../assets/img/next_turn_button.png';

interface Props {
  x: number;
  y: number;
  type: 'next-turn' | 'cheat';
  onClick?: () => void;
}

const ANCHOR_POINT = new PIXI.Point(0.5, 0.5);
const NORMAL_SCALE = new PIXI.Point(0.5, 0.5);
const MOUSE_OVER_SCALE = new PIXI.Point(0.52, 0.52);
const MOUSE_DOWN_SCALE = new PIXI.Point(0.42, 0.42);

export const Button: React.FC<Props> = ({ x, y, type, onClick }) => {
  const [mouseOver, setMouseOver] = useState<boolean>(false);
  const [mouseDown, setMouseDown] = useState<boolean>(false);
  return (
    <Container x={x} y={y}>
      <Sprite
        texture={PIXI.Texture.from(type === 'next-turn' ? nextTurnButtonGraphics : buttonGraphics)}
        interactive={true}
        click={onClick}
        scale={mouseDown ? MOUSE_DOWN_SCALE : mouseOver ? MOUSE_OVER_SCALE : NORMAL_SCALE}
        mouseover={() => {
          setMouseOver(true);
        }}
        mousedown={() => {
          setMouseDown(true);
        }}
        mouseup={() => {
          setMouseDown(false);
        }}
        mouseupoutside={() => {
          setMouseDown(false);
        }}
        mouseout={() => {
          setMouseOver(false);
        }}
        anchor={ANCHOR_POINT}
      />
    </Container>
  );
};
