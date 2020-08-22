import React from 'react';
import nieboGraphics from '../../assets/img/niebo.png';
import domekGraphics from '../../assets/img/domek.png';
import trawaGraphics from '../../assets/img/trawa.png';
import { Container, Sprite } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';

interface Props {}

export const Background: React.FC<Props> = ({}) => {
  return (
    <Container>
      <Sprite texture={PIXI.Texture.from(nieboGraphics)} width={2019} height={354} />
      <Sprite
        y={200}
        texture={PIXI.Texture.from(trawaGraphics)}
        width={2688 / 2}
        height={933 / 2}
      />
      <Sprite texture={PIXI.Texture.from(domekGraphics)} width={872 / 2} height={675 / 2} />
    </Container>
  );
};
