import React, { useEffect, useRef, useState } from 'react';
import chmurkaGraphics from '../../assets/img/chmurka.png';
import cienPodPostacGraphics from '../../assets/img/cien_pod_postac.png';
import { Sprite, Container, Text } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';
import { AnimatedContainer } from '../animated-container';
import { TimedContainer } from '../timed-container';

import dropGraphics from '../../assets/img/sfx/drop.png';
import shieldGraphics from '../../assets/img/sfx/shield.png';
import sfxBoom from '../../assets/img/sfx/boom.png';

import { AnimatedSprite } from '../animated-sprite';
import { nameMapping } from './enemy-data';

interface Props {
  x?: number;
  y?: number;
  hp: number;
  isSoaked: boolean;
  soaked: number;
  tough: number;
  isPoisoned: boolean;
  isDying: boolean;
  name: string;
}

type EntityState = 'isOk' | 'isDmg';

const ANCHOR_POINT = new PIXI.Point(0.5, 1);
const CENTER_POINT = new PIXI.Point(0.5, 0.5);

const getEnemyTexture = (name: string, state: 'isOk' | 'isDmg') => {
  const enemy = (nameMapping as any)[name] || nameMapping.Enemy;
  return enemy.texture[state];
};

const getEnemyAnimationSpeed = (name: string) => {
  const enemy = (nameMapping as any)[name] || nameMapping.Enemy;
  return enemy.animationSpeed;
};

const getTint = (isSoaked: boolean, isPoisoned: boolean) => {
  if (isSoaked && isPoisoned) {
    return { tint: 0xa0ffff };
  } else if (isSoaked) {
    return { tint: 0xa0a0ff };
  } else if (isPoisoned) {
    return { tint: 0xa0ffa0 };
  } else {
    return { tint: 0xffffff };
  }
};

const SCALE = new PIXI.Point(-1, 1);

const renderEntity = (props: Props, state: EntityState, setState: any) => {
  const { hp, name, isSoaked, soaked, tough, isPoisoned, isDying } = props;
  return (
    <Container {...(isDying ? { scale: SCALE, x: 100 } : {})}>
      <Sprite
        texture={PIXI.Texture.from(cienPodPostacGraphics)}
        width={244 / 2.6}
        height={58 / 2.6}
        anchor={ANCHOR_POINT}
      />
      {state === 'isOk' && (
        <AnimatedSprite
          textures={getEnemyTexture(name, 'isOk')}
          animationSpeed={getEnemyAnimationSpeed(name)}
          width={300 / 3}
          height={400 / 3}
          {...getTint(isSoaked, isPoisoned)}
          anchor={ANCHOR_POINT}
        />
      )}
      {state === 'isDmg' && (
        <AnimatedSprite
          textures={getEnemyTexture(name, 'isDmg')}
          animationSpeed={getEnemyAnimationSpeed(name)}
          width={300 / 3}
          height={400 / 3}
          {...getTint(isSoaked, isPoisoned)}
          anchor={ANCHOR_POINT}
        />
      )}
      <Container x={-20} y={-160}>
        <Sprite texture={PIXI.Texture.from(chmurkaGraphics)} width={100 / 3} height={84 / 3} />
        <Text
          x={hp > 10 ? 8 : 13}
          y={2}
          text={`${hp}`}
          style={{ fontSize: 16, fontWeight: 'bold', fontFamily: 'Sans' }}
        />
      </Container>

      {/* effects */}
      {soaked > 0 && (
        <Container x={0} y={-160}>
          <Sprite
            texture={PIXI.Texture.from(dropGraphics)}
            y={-3}
            scale={new PIXI.Point(0.2, 0.2)}
          />
          <Text
            x={9}
            y={2}
            text={`${soaked}`}
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              fontFamily: 'Sans',
              fill: 0x310cff,
              align: 'center',
            }}
          />
        </Container>
      )}

      {tough > 0 && (
        <Container x={-30} y={-160}>
          <Sprite
            texture={PIXI.Texture.from(shieldGraphics)}
            y={-1}
            scale={new PIXI.Point(0.2, 0.2)}
          />
          <Text
            x={9}
            y={2}
            text={`${tough}`}
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              fontFamily: 'Sans',
              fill: 0x676867,
              align: 'center',
            }}
          />
        </Container>
      )}
      {state === 'isDmg' && (
        <TimedContainer
          timeout={1000}
          onTimeout={() => {
            setState('isOk');
          }}
        >
          <AnimatedContainer x={0} y={0} blink={800}>
            <Sprite
              texture={PIXI.Texture.from(sfxBoom)}
              anchor={CENTER_POINT}
              y={-50}
              x={-5}
              scale={new PIXI.Point(0.25, 0.25)}
            />
          </AnimatedContainer>
        </TimedContainer>
      )}
    </Container>
  );
};

export const EntityGraphics: React.FC<Props> = (props) => {
  const [state, setState] = useState<EntityState>('isOk');
  const previousHp = useRef<number>();

  const { x = 0, y = 0, hp, isDying } = props;

  useEffect(() => {
    if (previousHp.current !== undefined && hp < previousHp.current) {
      setState('isDmg');
    }
    previousHp.current = hp;
  }, [hp]);

  return isDying ? (
    <AnimatedContainer x={1200} y={y} initialX={x} initialY={y} duration={2000}>
      {renderEntity(props, state, setState)}
    </AnimatedContainer>
  ) : (
    <AnimatedContainer x={x} y={y} initialX={1200}>
      {renderEntity(props, state, setState)}
    </AnimatedContainer>
  );
};
