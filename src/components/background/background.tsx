import React from 'react';
import nieboGraphics from '../../assets/img/niebo.png';
import domekGraphics from '../../assets/img/domek.png';
import trawaGraphics from '../../assets/img/trawa.png';
import plotekGraphics from '../../assets/img/plotek.png';
import { Container, Sprite } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';
const mipmapOption = { mipmap: PIXI.MIPMAP_MODES.ON };
interface Props {}

export const Background: React.FC<Props> = ({}) => {
  return (
    <Container>
      <Sprite texture={PIXI.Texture.from(nieboGraphics)} width={2019} height={354} />
      <Sprite
        y={100}
        texture={PIXI.Texture.from(plotekGraphics, mipmapOption)}
        width={1925 / 2}
        height={252 / 2}
      />
      <Sprite
        y={100}
        texture={PIXI.Texture.from(plotekGraphics, mipmapOption)}
        width={1925 / 2}
        height={252 / 2}
      />
      <Sprite
        y={100}
        x={960}
        texture={PIXI.Texture.from(plotekGraphics, mipmapOption)}
        width={1925 / 2}
        height={252 / 2}
      />
      <Sprite
        y={200}
        texture={PIXI.Texture.from(trawaGraphics, mipmapOption)}
        width={2688 / 2}
        height={933 / 2}
      />
      <Sprite texture={PIXI.Texture.from(domekGraphics)} width={872 / 2} height={675 / 2} />
    </Container>
  );
};
