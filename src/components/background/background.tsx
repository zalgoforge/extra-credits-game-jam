import React from 'react';
import nieboGraphics from '../../assets/img/niebo.png';
import { Container, Sprite } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';

interface Props {}

export const Background: React.FC<Props> = ({}) => {
  return (
    <Container>
      <Sprite texture={PIXI.Texture.from(nieboGraphics)} width={2019} height={354} />
    </Container>
  );
};
