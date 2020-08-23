import React, { useState } from 'react';
import chmurkaGraphics from '../../assets/img/chmurka.png';
import elfikGraphics from '../../assets/img/elfik.png';
import ogrGraphics from '../../assets/img/ogr.png';
import { Sprite, Container, Text } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';
import { AnimatedContainer } from '../animated-container';
import { v4 as uuidv4 } from 'uuid';
import { TimedContainer } from '../timed-container';
import { getRandomInt } from '../../utils';

interface Props {
  x?: number;
  y?: number;
  hp: number;
  name: string;
}

const ANCHOR_POINT = new PIXI.Point(0, 1);

const nameMapping: any = {
  Enemy: {
    texture: PIXI.Texture.from(elfikGraphics),
    sayings: ['Delivery from Fantazon', 'Package for mr. J. P. Swanson'],
  },
  FastEnemy: { texture: PIXI.Texture.from(ogrGraphics), sayings: ['...', 'Nothing to say'] },
  BigEnemy: { texture: PIXI.Texture.from(ogrGraphics), sayings: ['...', "I'm Hungry"] },
};

const getEnemyTexture = (name: string) => {
  return (nameMapping[name] || nameMapping.Enemy).texture;
};

const getEnemySaying = (name: string) => {
  const sayings = (nameMapping[name] || nameMapping.Enemy).sayings;
  const sayingIndex = getRandomInt(0, sayings.length - 1);
  return sayings[sayingIndex];
};

const shouldSaySomething = () => getRandomInt(0, 10) >= 7;

const renderEffect = (props: Props, e: any) => {
  if (e.type === 'show-message') {
    return (
      <Container x={-10} y={-200}>
        <Sprite texture={PIXI.Texture.from(chmurkaGraphics)} width={100} height={84} />
        <Text
          x={10}
          y={10}
          text={`${e.message}`}
          style={{
            fontSize: 14,
            fontWeight: 'bold',
            fontFamily: 'Sans',
            wordWrap: true,
            wordWrapWidth: 80,
          }}
        />
      </Container>
    );
  }
  return null;
};

export const EntityGraphics: React.FC<Props> = (props) => {
  const [effects, setEffects] = useState<any[]>([]);

  const { x = 0, y = 0, hp, name } = props;

  return (
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
                    timeout: 2000,
                    type: 'show-message',
                    message: getEnemySaying(props.name),
                  },
                ]
              : []),
          ];
        });
      }}
    >
      <Sprite
        texture={getEnemyTexture(name)}
        width={300 / 3}
        height={400 / 3}
        anchor={ANCHOR_POINT}
      />
      <Container x={30} y={-160}>
        <Sprite texture={PIXI.Texture.from(chmurkaGraphics)} width={100 / 3} height={84 / 3} />
        <Text
          x={13}
          y={2}
          text={`${hp}`}
          style={{ fontSize: 16, fontWeight: 'bold', fontFamily: 'Sans' }}
        />
      </Container>
      {effects.map((e) => {
        return (
          <TimedContainer
            key={e.id}
            timeout={e.timeout}
            onTimeout={() => {
              console.log('timeout');
              setEffects((prev) => prev.filter((prevEffect) => prevEffect.id !== e.id));
            }}
          >
            {renderEffect(props, e)}
          </TimedContainer>
        );
      })}
    </AnimatedContainer>
  );
};
