import React, { useState } from 'react';
import { Stage } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';
import { hot } from 'react-hot-loader/root';
import { StartingStage } from '../starting-stage';
import { MainStage } from '../main-stage';
import { EndStage } from '../end-stage';

interface Props {
  app: PIXI.Application;
}

export type StageType = 'starting' | 'main' | 'end';

const StageManagerComponent: React.FC<Props> = ({ app }) => {
  const [stage, setStage] = useState<StageType>('starting');
  const [score, setScore] = useState<number>(0);
  return (
    <Stage app={app}>
      {stage === 'starting' ? (
        <StartingStage
          onComplete={() => {
            setStage('main');
          }}
        />
      ) : null}
      {stage === 'main' ? (
        <MainStage
          app={app}
          onComplete={(score: number) => {
            setScore(score);
            setStage('end');
          }}
        />
      ) : null}
      {stage === 'end' ? (
        <EndStage
          score={score}
          onComplete={() => {
            setStage('starting');
          }}
        />
      ) : null}
    </Stage>
  );
};

export const StageManager = hot(StageManagerComponent);
