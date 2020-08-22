import { CustomPIXIComponent } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';
import TWEEN from '@tweenjs/tween.js';
import * as React from 'react';

interface Props extends React.PropsWithChildren<any> {
  x: number;
  y: number;
  alpha?: number;
}

export type AnimatedContainerInstance = PIXI.Container & {
  __oldX: number;
  __oldY: number;
  __tween: any;
};

const TYPE = 'AnimatedContainer';
export const behavior = {
  customDisplayObject: ({ x, y }: Props) => {
    const instance = new PIXI.Container() as AnimatedContainerInstance;
    instance.__oldX = x;
    instance.__oldY = y;
    return instance;
  },
  customApplyProps: (instance: AnimatedContainerInstance, oldProps: Props, newProps: Props) => {
    const coords = { x: instance.__oldX, y: instance.__oldY };
    if (instance.__tween) {
      instance.__tween.end();
    }
    console.log(`updating ${coords.x}px, ${newProps.x}px)`);
    instance.__tween = new TWEEN.Tween(coords)
      .to({ x: newProps.x, y: newProps.y }, 1000)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate(() => {
        instance.x = coords.x;
        instance.y = coords.y;
      })
      .start(TWEEN.now());
    instance.__oldX = newProps.x;
    instance.__oldY = newProps.y;
  },
};

export const AnimatedContainer = CustomPIXIComponent<AnimatedContainerInstance, Props>(
  behavior,
  TYPE
);
