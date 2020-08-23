import { CustomPIXIComponent, DisplayObjectProps } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';

interface Props extends DisplayObjectProps<PIXI.Container> {
  timeout: number;
  onTimeout: () => void;
}

export type TimedContainerInstance = PIXI.Container & {
  __isDone: boolean;
  __timer: any;
  __onTimeout: () => void;
  _destroyed: boolean;
};

const TYPE = 'TimedContainer';
export const behavior = {
  customDisplayObject: () => {
    const instance = new PIXI.Container() as TimedContainerInstance;
    instance.__isDone = false;
    return instance;
  },
  customApplyProps: function (instance: TimedContainerInstance, oldProps: Props, newProps: Props) {
    const { timeout: newTimeout, onTimeout: newOnTimeout, ...restNewProps } = newProps;
    const { timeout: oldTimeout, onTimeout: oldOnTimeout, ...restOldProps } = oldProps || {};

    if (!instance.__isDone && oldTimeout != newTimeout) {
      if (newTimeout === -1) {
        instance.__isDone = true;
      } else {
        clearTimeout(instance.__timer);
        instance.__timer = setTimeout(() => {
          instance.__isDone = true;
          if (!instance._destroyed) {
            instance.__onTimeout();
          }
        }, newTimeout);
      }
    }
    instance.__onTimeout = newOnTimeout;

    (this as any).applyDisplayObjectProps(restOldProps, restNewProps);
  },
};

export const TimedContainer = CustomPIXIComponent<TimedContainerInstance, Props>(behavior, TYPE);
