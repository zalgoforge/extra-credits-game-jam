import { Card, PlayContext } from '../card';
import { Actions } from '../actions';
import { TestEnemy, FastEnemy, BigEnemy, HealerEnemy, ToughEnemy } from '../enemies/enemies';
import { Enemy } from '../enemies/enemy';
import { Target } from '../target';
import { GameState } from '../game';
const pick = require('pick-random-weighted');

class Wave {
  enemies: () => Enemy[] = () => [];
  weight: number = 1;

  delay = 2;
};

let testWaves: Wave[] = [
  {
    enemies: () => [new TestEnemy, new TestEnemy],
    weight: 2,
    delay: 2,
  },
  {
    enemies: () => [new TestEnemy, new TestEnemy, new TestEnemy],
    weight: 2,
    delay: 2,
  },
  {
    enemies: () => [new TestEnemy],
    weight: 2,
    delay: 1,
  },

  {
    enemies: () => [new FastEnemy, new BigEnemy],
    weight: 2,
    delay: 2,
  },

  {
    enemies: () => [new FastEnemy, new FastEnemy],
    weight: 2,
    delay: 2,
  },

  {
    enemies: () => [new HealerEnemy, new HealerEnemy],
    weight: 2,
    delay: 2,
  },

  {
    enemies: () => [new ToughEnemy, new ToughEnemy],
    weight: 1,
    delay: 3,
  },

  {
    enemies: () => [new ToughEnemy, new FastEnemy],
    weight: 2,
    delay: 3,
  },

  {
    enemies: () => [new BigEnemy],
    weight: 2,
    delay: 2,
  },


];


function PickRandomWaveFromWaves(waves: Wave[]) : Wave {
  let input = waves.map( wave => [wave, wave.weight]);
  return pick(input);
}

export class SpawnEnemies extends Card {
  delay = 1;
  turn = 0;
  availableColumns = 2;
  lastPick: Wave | null = null;

  constructor() {
    super();
    this.title = 'SpawnEnemies';
    this.description = 'SpawnEnemies';
    //this.passiveDescription = 'Lorem ipsum ala ma kota, test';
  }

  play(ctx: PlayContext) {

  }

  onAddedAsPassive() {
    this.spawnEnemiesAtBack();
  }

  endOfTurn() {
    this.turn ++;
    if (GameState.instance().board.entities.length == 0) {
      this.turn = this.delay;
    }

    if (this.turn < this.delay) return;
    if (!this.spawnEnemiesAtBack()) return;
    this.turn = 0;
  }

  spawnEnemiesAtBack() {
    let field = Target.randomLastEmptyField(this.availableColumns);
    if (!field) {
      return false;
    }

    let wave: Wave;
    do {
      wave = PickRandomWaveFromWaves(testWaves);
    }
    while (wave == this.lastPick);
    this.lastPick = wave;

    this.delay = wave.delay;
    let enemies = wave.enemies();

    for(let enemy of enemies) {
      Actions.spawnEnemy(enemy, field);
      field = Target.randomLastEmptyField(this.availableColumns);
      if (!field) {
        return true;
      }
    }

    return true;
  }
}
