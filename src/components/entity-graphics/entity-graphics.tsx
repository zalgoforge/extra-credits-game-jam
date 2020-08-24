import React, { useEffect, useRef, useState } from 'react';
import chmurkaGraphics from '../../assets/img/chmurka.png';
import cienPodPostacGraphics from '../../assets/img/cien_pod_postac.png';
import { Sprite, Container, Text } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';
import { AnimatedContainer } from '../animated-container';
import { v4 as uuidv4 } from 'uuid';
import { TimedContainer } from '../timed-container';
import { getRandomInt } from '../../utils';

import popupGraphics from '../../assets/img/dialogue/popup.png';
import dropGraphics from '../../assets/img/sfx/drop.png';
import sfxBoom from '../../assets/img/sfx/boom.png';

import elfikCierpiGraphics from '../../assets/img/enemies/elfik_cierpi.png';
import ogrCierpiGraphics from '../../assets/img/enemies/ogr_cierpi.png';
import headhunterCierpiGraphics from '../../assets/img/enemies/headhunter_cierpi.png';
import inkwizytorCierpiGraphics from '../../assets/img/enemies/inkwizytor_cierpi.png';
import wiedzmaGraphics from '../../assets/img/enemies/wiedzma.png';
import wiedzmaCierpiGraphics from '../../assets/img/enemies/wiedzma_cierpi.png';

import elfikFrame0000 from '../../assets/img/animated_enemies/elfik/frame_0000.png';
import elfikFrame0001 from '../../assets/img/animated_enemies/elfik/frame_0001.png';
import elfikFrame0002 from '../../assets/img/animated_enemies/elfik/frame_0002.png';
import elfikFrame0003 from '../../assets/img/animated_enemies/elfik/frame_0003.png';
import elfikFrame0004 from '../../assets/img/animated_enemies/elfik/frame_0004.png';
import elfikFrame0005 from '../../assets/img/animated_enemies/elfik/frame_0005.png';
import elfikFrame0006 from '../../assets/img/animated_enemies/elfik/frame_0006.png';
import elfikFrame0007 from '../../assets/img/animated_enemies/elfik/frame_0007.png';

import ogrFrame0000 from '../../assets/img/animated_enemies/ogr/frame_0000.png';
import ogrFrame0001 from '../../assets/img/animated_enemies/ogr/frame_0001.png';
import ogrFrame0002 from '../../assets/img/animated_enemies/ogr/frame_0002.png';
import ogrFrame0003 from '../../assets/img/animated_enemies/ogr/frame_0003.png';

import inkwizytorFrame0000 from '../../assets/img/animated_enemies/inkwizytor/frame_0000.png';
import inkwizytorFrame0001 from '../../assets/img/animated_enemies/inkwizytor/frame_0001.png';
import inkwizytorFrame0002 from '../../assets/img/animated_enemies/inkwizytor/frame_0002.png';
import inkwizytorFrame0003 from '../../assets/img/animated_enemies/inkwizytor/frame_0003.png';
import inkwizytorFrame0004 from '../../assets/img/animated_enemies/inkwizytor/frame_0004.png';
import inkwizytorFrame0005 from '../../assets/img/animated_enemies/inkwizytor/frame_0005.png';
import inkwizytorFrame0006 from '../../assets/img/animated_enemies/inkwizytor/frame_0006.png';
import inkwizytorFrame0007 from '../../assets/img/animated_enemies/inkwizytor/frame_0007.png';

import headhunterFrame0000 from '../../assets/img/animated_enemies/headhunter/frame_0000.png';
import headhunterFrame0001 from '../../assets/img/animated_enemies/headhunter/frame_0001.png';
import headhunterFrame0002 from '../../assets/img/animated_enemies/headhunter/frame_0002.png';
import headhunterFrame0003 from '../../assets/img/animated_enemies/headhunter/frame_0003.png';
import headhunterFrame0004 from '../../assets/img/animated_enemies/headhunter/frame_0004.png';
import headhunterFrame0005 from '../../assets/img/animated_enemies/headhunter/frame_0005.png';
import headhunterFrame0006 from '../../assets/img/animated_enemies/headhunter/frame_0006.png';
import headhunterFrame0007 from '../../assets/img/animated_enemies/headhunter/frame_0007.png';

import { AnimatedSprite } from '../animated-sprite';

interface Props {
  x?: number;
  y?: number;
  hp: number;
  isSoaked: boolean;
  soaked: number;
  isPoisoned: boolean;
  isDying: boolean;
  name: string;
}

type EntityState = 'isOk' | 'isDmg';

interface EnemyData {
  texture: {
    isOk: PIXI.Texture[];
    isDmg: PIXI.Texture[];
  };
  animationSpeed: number;
  sayings: string[];
}

interface NameMapping {
  Enemy: EnemyData;
  FastEnemy: EnemyData;
  BigEnemy: EnemyData;
  HealerEnemy: EnemyData;
  ToughEnemy: EnemyData;
}

const ANCHOR_POINT = new PIXI.Point(0.5, 1);
const CENTER_POINT = new PIXI.Point(0.5, 0.5);

const mipmapOption = { mipmap: PIXI.MIPMAP_MODES.ON };

const nameMapping: NameMapping = {
  Enemy: {
    texture: {
      isOk: [
        PIXI.Texture.from(elfikFrame0000, mipmapOption),
        PIXI.Texture.from(elfikFrame0001, mipmapOption),
        PIXI.Texture.from(elfikFrame0002, mipmapOption),
        PIXI.Texture.from(elfikFrame0003, mipmapOption),
        PIXI.Texture.from(elfikFrame0004, mipmapOption),
        PIXI.Texture.from(elfikFrame0005, mipmapOption),
        PIXI.Texture.from(elfikFrame0006, mipmapOption),
        PIXI.Texture.from(elfikFrame0007, mipmapOption),
      ],
      isDmg: [PIXI.Texture.from(elfikCierpiGraphics, mipmapOption)],
    },
    animationSpeed: 0.2,
    sayings: ['Delivery from Fantazon', 'Package for mr. J. P. Swanson'],
  },
  FastEnemy: {
    texture: {
      isOk: [
        PIXI.Texture.from(headhunterFrame0000, mipmapOption),
        PIXI.Texture.from(headhunterFrame0001, mipmapOption),
        PIXI.Texture.from(headhunterFrame0002, mipmapOption),
        PIXI.Texture.from(headhunterFrame0003, mipmapOption),
        PIXI.Texture.from(headhunterFrame0004, mipmapOption),
        PIXI.Texture.from(headhunterFrame0005, mipmapOption),
        PIXI.Texture.from(headhunterFrame0006, mipmapOption),
        PIXI.Texture.from(headhunterFrame0007, mipmapOption),
      ],
      isDmg: [PIXI.Texture.from(headhunterCierpiGraphics, mipmapOption)],
    },
    animationSpeed: 0.15,
    sayings: [
      'Looking for Java Developers',
      'Do you know JavaScript maybe?',
      'Hello mr <PasteNameHere>!',
    ],
  },
  BigEnemy: {
    texture: {
      isOk: [
        PIXI.Texture.from(ogrFrame0000, mipmapOption),
        PIXI.Texture.from(ogrFrame0001, mipmapOption),
        PIXI.Texture.from(ogrFrame0002, mipmapOption),
        PIXI.Texture.from(ogrFrame0003, mipmapOption),
      ],
      isDmg: [PIXI.Texture.from(ogrCierpiGraphics, mipmapOption)],
    },
    animationSpeed: 0.2,
    sayings: [
      'There was a gas leak',
      'Sir, did you check your pipes?',
      'Gas can be hallucinogenic',
    ],
  },
  HealerEnemy: {
    texture: {
      isOk: [
        PIXI.Texture.from(inkwizytorFrame0000, mipmapOption),
        PIXI.Texture.from(inkwizytorFrame0001, mipmapOption),
        PIXI.Texture.from(inkwizytorFrame0002, mipmapOption),
        PIXI.Texture.from(inkwizytorFrame0003, mipmapOption),
        PIXI.Texture.from(inkwizytorFrame0004, mipmapOption),
        PIXI.Texture.from(inkwizytorFrame0005, mipmapOption),
        PIXI.Texture.from(inkwizytorFrame0006, mipmapOption),
        PIXI.Texture.from(inkwizytorFrame0007, mipmapOption),
      ],
      isDmg: [PIXI.Texture.from(inkwizytorCierpiGraphics, mipmapOption)],
    },
    animationSpeed: 0.2,
    sayings: ['Do you want to talk about Jesus?'],
  },
  ToughEnemy: {
    texture: {
      isOk: [PIXI.Texture.from(wiedzmaGraphics, mipmapOption)],
      isDmg: [PIXI.Texture.from(wiedzmaCierpiGraphics, mipmapOption)],
    },
    animationSpeed: 0.2,
    sayings: ['Do you have any sugar, neighbor?'],
  },
};

const getEnemyTexture = (name: string, state: 'isOk' | 'isDmg') => {
  const enemy = (nameMapping as any)[name] || nameMapping.Enemy;
  return enemy.texture[state];
};

const getEnemyAnimationSpeed = (name: string) => {
  const enemy = (nameMapping as any)[name] || nameMapping.Enemy;
  return enemy.animationSpeed;
};

const getEnemySaying = (name: string) => {
  const sayings = ((nameMapping as any)[name] || nameMapping.Enemy).sayings;
  const sayingIndex = getRandomInt(0, sayings.length - 1);
  return sayings[sayingIndex];
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

const SCALE = new PIXI.Point(-1, 1);

const renderEntity = (
  props: Props,
  state: EntityState,
  effects: any[],
  setEffects: any,
  setState: any
) => {
  const { hp, name, isSoaked, soaked, isPoisoned, isDying } = props;
  return (
    <Container {...(isDying ? { scale: SCALE, x: 100 } : {})}>
      <Sprite
        texture={PIXI.Texture.from(cienPodPostacGraphics)}
        width={244 / 2.6}
        height={58 / 2.6}
        anchor={ANCHOR_POINT}
      />
      {state === 'isOk' && ( <AnimatedSprite
        textures={getEnemyTexture(name, 'isOk')}
        animationSpeed={getEnemyAnimationSpeed(name)}
        width={300 / 3}
        height={400 / 3}
        {...getTint(isSoaked, isPoisoned)}
        anchor={ANCHOR_POINT}
      /> ) }
      {state === 'isDmg' && ( <AnimatedSprite
        textures={getEnemyTexture(name, 'isDmg')}
        animationSpeed={getEnemyAnimationSpeed(name)}
        width={300 / 3}
        height={400 / 3}
        {...getTint(isSoaked, isPoisoned)}
        anchor={ANCHOR_POINT}
      /> ) }
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
      { soaked > 0 && (
        <Container x={0} y={-160}>
        <Sprite texture={PIXI.Texture.from(dropGraphics)} y={-3} scale={new PIXI.Point(0.2,0.2)} />
        <Text
          x={9}
          y={2}
          text={`${soaked}`}
          style={{ fontSize: 16, fontWeight: 'bold', fontFamily: 'Sans', fill: 0x310CFF, align: 'center' }}
        />
      </Container>
      )}



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
      {state === 'isDmg' && (
        <TimedContainer
          timeout={1500}
          onTimeout={() => {
            setState('isOk');
          }}
        >
          <AnimatedContainer x={0} y={0} blink={1500}>
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
  const [effects, setEffects] = useState<any[]>([]);
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
      {renderEntity(props, state, effects, setEffects, setState)}
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
      {renderEntity(props, state, effects, setEffects, setState)}
    </AnimatedContainer>
  );
};
