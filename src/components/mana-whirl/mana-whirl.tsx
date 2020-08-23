import React, { useState } from 'react';
import { Container, Sprite } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';
import manaWhirlGraphics from '../../assets/img/mana_whirl.png';
import manaTextGraphics from '../../assets/img/mana_text.png';
import { TimedContainer } from '../timed-container';
import { Digit } from '../digit';

interface Props {
  x?: number;
  y?: number;
  mana: number;
}

export const ManaWhirl: React.FC<Props> = ({ x = 0, y = 0, mana }) => {
  const [showManaText, setShowManaText] = useState<boolean>(true);
  return (
    <Container x={x} y={y}>
      <Sprite width={402 / 2.2} height={406 / 2.2} texture={PIXI.Texture.from(manaWhirlGraphics)} />
      <Digit x={16} y={22} digit={mana} />
      <TimedContainer
        timeout={2000}
        onTimeout={() => {
          setShowManaText(false);
        }}
      >
        {showManaText ? (
          <Sprite
            x={120}
            y={-70}
            width={285 / 2.2}
            height={238 / 2.2}
            texture={PIXI.Texture.from(manaTextGraphics)}
          />
        ) : null}
      </TimedContainer>
    </Container>
  );
};
