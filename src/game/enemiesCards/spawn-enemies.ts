import { Card, PlayContext } from '../card';
import { Actions } from '../actions';
import { TestEnemy } from '../enemies/test-enemy';
import { FastEnemy } from '../enemies/fast-enemy';
import { BigEnemy } from '../enemies/big-enemy';
import { Enemy } from '../enemies/enemy';
import { Target } from '../target';
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
    delay: 3,
  },
  {
    enemies: () => [new TestEnemy],
    weight: 2,
    delay: 2,
  },

  {
    enemies: () => [new FastEnemy, new FastEnemy],
    weight: 2,
    delay: 3,
  },

  {
    enemies: () => [new BigEnemy],
    weight: 2,
    delay: 4,
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

  constructor() {
    super();
    this.title = 'SpawnEnemies';
    this.description = 'SpawnEnemies';
  }

  play(ctx: PlayContext) {

  }

  endOfTurn() {
    // TODO each(3).turns() would be a good api...
    this.turn ++;
    if (this.turn < this.delay) return;
    if (!this.spawnEnemiesAtBack()) return;
    this.turn = 0;
  }

  spawnEnemiesAtBack() {
    let field = Target.randomLastEmptyField(this.availableColumns);
    if (!field) {
      return false;
    }

    let wave = PickRandomWaveFromWaves(testWaves);
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
