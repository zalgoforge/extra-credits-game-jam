import { CustomPIXIComponent } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';
import TWEEN from '@tweenjs/tween.js';
import * as React from 'react';

interface Props extends React.PropsWithChildren<any> {
  x: number;
  y: number;
  initialX?: number;
  initialY?: number;
  alpha?: number;
  initialAlpha?: number;
  onMoveStarted?: () => void;
  onMoveFinished?: () => void;
}

export type AnimatedContainerInstance = PIXI.Container & {
  __oldX: number;
  __oldY: number;
  __oldAlpha?: number;
  __tweenPosition: any;
  __tweenAlpha: any;
  _destroyed: boolean;
  __onMoveFinished?: () => void;
};

const TYPE = 'AnimatedContainer';
export const behavior = {
  customDisplayObject: ({ x, y, initialX, initialY, initialAlpha, alpha }: Props) => {
    const instance = new PIXI.Container() as AnimatedContainerInstance;
    instance.__oldX = initialX !== undefined ? initialX : x;
    instance.__oldY = initialY !== undefined ? initialY : y;
    instance.__oldAlpha = initialAlpha !== undefined ? initialAlpha : alpha || 1.0;
    return instance;
  },
  customApplyProps: (instance: AnimatedContainerInstance, oldProps: Props, newProps: Props) => {
    if (!oldProps || oldProps.x !== newProps.x || oldProps.y !== newProps.y) {
      const coords = { x: instance.__oldX, y: instance.__oldY };
      if (instance.__tweenPosition) {
        instance.__tweenPosition.end();
      }
      instance.__tweenPosition = new TWEEN.Tween(coords)
        .to({ x: newProps.x, y: newProps.y }, 1000)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(() => {
          if (!instance._destroyed) {
            instance.x = coords.x;
            instance.y = coords.y;
          }
        })
        .onComplete(() => {
          if (!instance._destroyed && instance.__onMoveFinished) {
            instance.__onMoveFinished();
          }
        })
        .start(TWEEN.now());
      instance.__oldX = newProps.x;
      instance.__oldY = newProps.y;
      if (!instance._destroyed && newProps.onMoveStarted) {
        newProps.onMoveStarted();
      }
    }
    if (!oldProps || oldProps.alpha !== newProps.alpha) {
      const coords = { alpha: instance.__oldAlpha };
      if (instance.__tweenAlpha) {
        instance.__tweenAlpha.end();
      }
      instance.__tweenAlpha = new TWEEN.Tween(coords)
        .to({ alpha: newProps.alpha }, 1000)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(() => {
          if (!instance._destroyed && coords.alpha) {
            instance.alpha = coords.alpha;
          }
        })
        .start(TWEEN.now());
      instance.__oldAlpha = newProps.alpha;
    }
    instance.__onMoveFinished = newProps.onMoveFinished;
  },
};

export const AnimatedContainer = CustomPIXIComponent<AnimatedContainerInstance, Props>(
  behavior,
  TYPE
);
