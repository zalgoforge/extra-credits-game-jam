import React, { useState } from 'react';
import { Sprite, Container, Text } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';
import { AnimatedContainer } from '../animated-container';
import { v4 as uuidv4 } from 'uuid';
import { TimedContainer } from '../timed-container';
import { getRandomInt } from '../../utils';

import popupGraphics from '../../assets/img/dialogue/popup.png';
import { nameMapping } from './enemy-data';

interface Props {
  x?: number;
  y?: number;
  name: string;
  isDying: boolean;
}

const getEnemySaying = (name: string) => {
  const sayings = ((nameMapping as any)[name] || nameMapping.Enemy).sayings;
  const sayingIndex = getRandomInt(0, sayings.length - 1);
  return sayings[sayingIndex];
};

const shouldSaySomething = () => getRandomInt(0, 10) >= 8;

const renderEffect = (props: Props, e: any) => {
  if (e.type === 'show-message') {
    return (
      <Container x={-150} y={-170}>
        <Sprite texture={PIXI.Texture.from(popupGraphics)} width={100} height={84} />
        <Text
          x={20}
          y={20}
          text={`${e.message}`}
          style={{
            fontSize: 11,
            fontWeight: 'bold',
            fontFamily: 'Sans',
            wordWrap: true,
            wordWrapWidth: 70,
          }}
        />
      </Container>
    );
  }
  return null;
};

const renderEntity = (props: Props, effects: any[], setEffects: any) => {
  return (
    <Container>
      {effects.map((e) => {
        return (
          <TimedContainer
            key={e.id}
            timeout={e.timeout}
            onTimeout={() => {
              setEffects((prev: any) => prev.filter((prevEffect: any) => prevEffect.id !== e.id));
            }}
          >
            {renderEffect(props, e)}
          </TimedContainer>
        );
      })}
    </Container>
  );
};

export const SayingsGraphics: React.FC<Props> = (props) => {
  const [effects, setEffects] = useState<any[]>([]);

  const { x = 0, y = 0, isDying } = props;

  return isDying ? (
    <AnimatedContainer x={1200} y={y} initialX={x} initialY={y} duration={2000}>
      {renderEntity(props, effects, setEffects)}
    </AnimatedContainer>
  ) : (
    <AnimatedContainer
      x={x}
      y={y}
      initialX={1200}
      onMoveFinished={() => {
        setEffects((prev) => {
          return [
            ...prev,
            ...(shouldSaySomething()
              ? [
                  {
                    id: uuidv4(),
                    timeout: 3000,
                    type: 'show-message',
                    message: getEnemySaying(props.name),
                  },
                ]
              : []),
          ];
        });
      }}
    >
      {renderEntity(props, effects, setEffects)}
    </AnimatedContainer>
  );
};
