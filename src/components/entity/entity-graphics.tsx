import React, { useEffect, useRef, useState } from 'react';
import chmurkaGraphics from '../../assets/img/chmurka.png';
import elfikGraphics from '../../assets/img/elfik.png';
import elfikCierpiGraphics from '../../assets/img/elfik_cierpi.png';
import ogrGraphics from '../../assets/img/ogr.png';
import ogrCierpiGraphics from '../../assets/img/ogr_cierpi.png';
import headhunterGraphics from '../../assets/img/headhunter.png';
import headhunterCierpiGraphics from '../../assets/img/headhunter_cierpi.png';
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

type EntityState = 'isOk' | 'isDmg';

interface EnemyData {
  texture: {
    isOk: PIXI.Texture;
    isDmg: PIXI.Texture;
  };
  sayings: string[];
}

interface NameMapping {
  Enemy: EnemyData;
  FastEnemy: EnemyData;
  BigEnemy: EnemyData;
}

const ANCHOR_POINT = new PIXI.Point(0, 1);

const nameMapping: NameMapping = {
  Enemy: {
    texture: {
      isOk: PIXI.Texture.from(elfikGraphics),
      isDmg: PIXI.Texture.from(elfikCierpiGraphics),
    },
    sayings: ['Delivery from Fantazon', 'Package for mr. J. P. Swanson'],
  },
  FastEnemy: {
    texture: {
      isOk: PIXI.Texture.from(headhunterGraphics),
      isDmg: PIXI.Texture.from(headhunterCierpiGraphics),
    },
    sayings: [
      'Looking for Java Developers',
      'Do You know JavaScript maybe?',
      'Hello mr <PasteNameHere>!',
    ],
  },
  BigEnemy: {
    texture: { isOk: PIXI.Texture.from(ogrGraphics), isDmg: PIXI.Texture.from(ogrCierpiGraphics) },
    sayings: ['Need to measure your water reading', 'Sir, did you check your pipes?'],
  },
};

const getEnemyTexture = (name: string, state: 'isOk' | 'isDmg') => {
  const enemy = (nameMapping as any)[name] || nameMapping.Enemy;
  return enemy.texture[state];
};

const getEnemySaying = (name: string) => {
  const sayings = ((nameMapping as any)[name] || nameMapping.Enemy).sayings;
  const sayingIndex = getRandomInt(0, sayings.length - 1);
  return sayings[sayingIndex];
};

const shouldSaySomething = () => getRandomInt(0, 10) >= 8;

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

export const EntityGraphics: React.FC<Props> = (props) => {
  const [effects, setEffects] = useState<any[]>([]);
  const [state, setState] = useState<EntityState>('isOk');
  const previousHp = useRef<number>();

  const { x = 0, y = 0, hp, name } = props;

  useEffect(() => {
    if (previousHp.current !== undefined && hp !== previousHp.current) {
      setState('isDmg');
    }
    previousHp.current = hp;
  }, [hp]);

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
        texture={getEnemyTexture(name, state)}
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
      {state === 'isDmg' && (
        <TimedContainer
          timeout={700}
          onTimeout={() => {
            setState('isOk');
          }}
        />
      )}
    </AnimatedContainer>
  );
};
