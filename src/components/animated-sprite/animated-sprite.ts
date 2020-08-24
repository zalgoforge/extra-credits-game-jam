import { CustomPIXIComponent } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';
import * as React from 'react';

interface Props extends Partial<React.PropsWithChildren<PIXI.AnimatedSprite>> {}

export type AnimatedContainerInstance = PIXI.AnimatedSprite & {
  _destroyed: boolean;
};

const TYPE = 'AnimatedSprite';
export const behavior = {
  customDisplayObject: ({ textures }: AnimatedContainerInstance) => {
    const instance = new PIXI.AnimatedSprite(textures) as AnimatedContainerInstance;
    instance.animationSpeed = 0.2;
    instance.play();
    return instance;
  },
  customApplyProps: function (
    instance: Partial<AnimatedContainerInstance>,
    oldProps: Props,
    newProps: Props
  ) {
    instance.width = newProps.width;
    instance.height = newProps.height;
    instance.tint = newProps.tint;
    instance.anchor = newProps.anchor;
    //(this as any).applyDisplayObjectProps(oldProps, newProps);
  },
};

export const AnimatedSprite = CustomPIXIComponent<AnimatedContainerInstance, Props>(
  behavior as any,
  TYPE
);
