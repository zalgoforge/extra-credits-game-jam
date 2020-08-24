import * as PIXI from 'pixi.js';
import elfikFrame0000 from '../../assets/img/animated_enemies/elfik/frame_0000.png';
import elfikFrame0001 from '../../assets/img/animated_enemies/elfik/frame_0001.png';
import elfikFrame0002 from '../../assets/img/animated_enemies/elfik/frame_0002.png';
import elfikFrame0003 from '../../assets/img/animated_enemies/elfik/frame_0003.png';
import elfikFrame0004 from '../../assets/img/animated_enemies/elfik/frame_0004.png';
import elfikFrame0005 from '../../assets/img/animated_enemies/elfik/frame_0005.png';
import elfikFrame0006 from '../../assets/img/animated_enemies/elfik/frame_0006.png';
import elfikFrame0007 from '../../assets/img/animated_enemies/elfik/frame_0007.png';
import elfikCierpiGraphics from '../../assets/img/enemies/elfik_cierpi.png';
import headhunterFrame0000 from '../../assets/img/animated_enemies/headhunter/frame_0000.png';
import headhunterFrame0001 from '../../assets/img/animated_enemies/headhunter/frame_0001.png';
import headhunterFrame0002 from '../../assets/img/animated_enemies/headhunter/frame_0002.png';
import headhunterFrame0003 from '../../assets/img/animated_enemies/headhunter/frame_0003.png';
import headhunterFrame0004 from '../../assets/img/animated_enemies/headhunter/frame_0004.png';
import headhunterFrame0005 from '../../assets/img/animated_enemies/headhunter/frame_0005.png';
import headhunterFrame0006 from '../../assets/img/animated_enemies/headhunter/frame_0006.png';
import headhunterFrame0007 from '../../assets/img/animated_enemies/headhunter/frame_0007.png';
import headhunterCierpiGraphics from '../../assets/img/enemies/headhunter_cierpi.png';
import ogrFrame0000 from '../../assets/img/animated_enemies/ogr/frame_0000.png';
import ogrFrame0001 from '../../assets/img/animated_enemies/ogr/frame_0001.png';
import ogrFrame0002 from '../../assets/img/animated_enemies/ogr/frame_0002.png';
import ogrFrame0003 from '../../assets/img/animated_enemies/ogr/frame_0003.png';
import ogrCierpiGraphics from '../../assets/img/enemies/ogr_cierpi.png';
import inkwizytorFrame0000 from '../../assets/img/animated_enemies/inkwizytor/frame_0000.png';
import inkwizytorFrame0001 from '../../assets/img/animated_enemies/inkwizytor/frame_0001.png';
import inkwizytorFrame0002 from '../../assets/img/animated_enemies/inkwizytor/frame_0002.png';
import inkwizytorFrame0003 from '../../assets/img/animated_enemies/inkwizytor/frame_0003.png';
import inkwizytorFrame0004 from '../../assets/img/animated_enemies/inkwizytor/frame_0004.png';
import inkwizytorFrame0005 from '../../assets/img/animated_enemies/inkwizytor/frame_0005.png';
import inkwizytorFrame0006 from '../../assets/img/animated_enemies/inkwizytor/frame_0006.png';
import inkwizytorFrame0007 from '../../assets/img/animated_enemies/inkwizytor/frame_0007.png';
import inkwizytorCierpiGraphics from '../../assets/img/enemies/inkwizytor_cierpi.png';
import wiedzmaGraphics from '../../assets/img/enemies/wiedzma.png';
import wiedzmaCierpiGraphics from '../../assets/img/enemies/wiedzma_cierpi.png';

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

const mipmapOption = { mipmap: PIXI.MIPMAP_MODES.ON };

export const nameMapping: NameMapping = {
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
    sayings: [
      'Sir, pandemic ended months ago!',
      'Sir, I will deliver this package, resistance is futile.',
      "It's a package from your mom, sir.",
      'I have a package from Fantazon.',
    ],
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
      'We have an excellent dental plan.',
      'Our corporation has free Taco Tuesdays!',
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
      'Hallucinogenic gas is toxic, please let me in.',
      "We don't even need to talk, I just want to see your pipes!",
      'Sir, this will only take a minute.',
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
    sayings: [
      'Do you want to talk about Jesus?',
      'Jesus is our Lord and Savior.',
      "Your behaviour shows me you haven't accepted Jesus yet.",
      'Just open your heart and doors.',
    ],
  },
  ToughEnemy: {
    texture: {
      isOk: [PIXI.Texture.from(wiedzmaGraphics, mipmapOption)],
      isDmg: [PIXI.Texture.from(wiedzmaCierpiGraphics, mipmapOption)],
    },
    animationSpeed: 0.2,
    sayings: [
      'Do you have any sugar, neighbor?',
      'I want to bake a cake, you know.',
      'I need that sweet sugar!',
      'I bet you have a lot of sugar, share some.',
    ],
  },
};
