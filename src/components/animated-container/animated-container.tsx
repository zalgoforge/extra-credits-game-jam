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
  duration?: number;
  initialAlpha?: number;
  onMoveStarted?: () => void;
  onMoveFinished?: () => void;
}

export type AnimatedContainerInstance = PIXI.Container & {
  __oldX: number;
  __oldY: number;
  __oldAlpha?: number;
  __tweenPosition: any;
  __coords: any;
  __tweenAlpha: any;
  __tweenBlink: any;
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
      if (instance.__tweenPosition) {
        instance.__tweenPosition.stop();
      } else {
        instance.__coords = { x: instance.__oldX, y: instance.__oldY };
      }
      instance.__tweenPosition = new TWEEN.Tween(instance.__coords)
        .to({ x: newProps.x, y: newProps.y }, newProps.duration || 1000)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(() => {
          if (!instance._destroyed) {
            instance.x = instance.__coords.x;
            instance.y = instance.__coords.y;
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
        .to({ alpha: newProps.alpha }, newProps.duration || 1000)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(() => {
          if (!instance._destroyed && coords.alpha) {
            instance.alpha = coords.alpha;
          }
        })
        .start(TWEEN.now());
      instance.__oldAlpha = newProps.alpha;
    }

    if (!oldProps || oldProps.blink !== newProps.blink) {
      if (instance.__tweenBlink) {
        instance.__tweenBlink.end();
      }

      if (!newProps.blink) return;

      const coords = { alpha: 0, scale: 0.75 };
      const duration = newProps.blink;
      let onUpdate = () => {
        if (!instance._destroyed) {
          instance.alpha = coords.alpha;
          instance.scale = new PIXI.Point( coords.scale, coords.scale )
        };
      };

      instance.__tweenAlpha = new TWEEN.Tween(coords)
        .to({ alpha: 1, scale: 1.5 }, duration/2)
        .easing(TWEEN.Easing.Quadratic.In)
        .onUpdate(onUpdate);

      instance.__tweenAlpha.chain(
        new TWEEN.Tween(coords)
        .to({ alpha: 0 }, duration/2)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(onUpdate));

      instance.__tweenAlpha.start(TWEEN.now());

      instance.__oldAlpha = newProps.alpha;
    }

    instance.__onMoveFinished = newProps.onMoveFinished;
  },
};

export const AnimatedContainer = CustomPIXIComponent<AnimatedContainerInstance, Props>(
  behavior,
  TYPE
);
