import { CustomPIXIComponent } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';

interface Props {
  x?: number;
  y?: number;
  fill: number;
  width: number;
  height: number;
  alpha?: number;
  interactive?: boolean;
}

const TYPE = 'Rect';
export const behavior = {
  customDisplayObject: () => new PIXI.Graphics(),
  customApplyProps: (instance: PIXI.Graphics, oldProps: Props, newProps: Props) => {
    const { fill, x, y, width, height, alpha } = newProps;
    instance.clear();
    instance.beginFill(fill, alpha);
    instance.drawRect(x || 0, y || 0, width, height);
    instance.endFill();
    instance.interactive = newProps.interactive || false;
  },
};

export const Rect = CustomPIXIComponent<PIXI.Graphics, Props>(behavior, TYPE);
