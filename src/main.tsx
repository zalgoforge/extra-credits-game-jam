import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { StageManager } from './components/stage-manager';
import { useState } from 'react';
import * as PIXI from 'pixi.js';
import TWEEN from '@tweenjs/tween.js';

const createApp = (canvas: HTMLCanvasElement) => {
  PIXI.settings.MIPMAP_TEXTURES = PIXI.MIPMAP_MODES.ON;
  const app = new PIXI.Application({
    backgroundColor: 0x10bb99,
    height: 512 + 128 + 24,
    width: 1024,
    view: canvas,
  });

  app.ticker.add((delta) => {
    TWEEN.update(TWEEN.now());
  });

  return app;
};

const CanvasComponent = ({ MainComponent }: any) => {
  const [app, setApp] = useState<PIXI.Application>();

  return (
    <canvas
      ref={(canvasRef) => {
        if (!app && canvasRef) {
          setApp(createApp(canvasRef));
        }
      }}
    >
      {app ? <MainComponent app={app} /> : 'Initializing...'}
    </canvas>
  );
};

const renderApp = (Main: React.FC<any>) => {
  ReactDOM.render(<CanvasComponent MainComponent={Main} />, document.getElementById('root'));
};

renderApp(StageManager);

if (module.hot) {
  module.hot.accept('./components/stage-manager', () => {
    renderApp(require('./components/stage-manager').StageManager);
  });
}
