import { Card, PlayContext } from '../card';
import { Actions } from '../actions';
import { TestEnemy } from '../enemies/test-enemy';
import { FastEnemy } from '../enemies/fast-enemy';
import { BigEnemy } from '../enemies/big-enemy';
import { Target } from '../target';
const pick = require('pick-random-weighted');

export class SpawnEnemies extends Card {
  delay = 3;
  turn = 0;

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
    let field = Target.randomLastEmptyField();
    if (!field) {
      return false;
    }

    const enemyWaves = [
      [() => [new TestEnemy, new TestEnemy], 2],
      [() => [new TestEnemy, new TestEnemy, new TestEnemy], 2],
      [() => [new FastEnemy, new TestEnemy], 2],
      [() => [new BigEnemy], 1]
    ];

    let enemies = pick(enemyWaves)();

    for(let enemy of enemies) {
      Actions.spawnEnemy(enemy, field);
      field = Target.randomLastEmptyField();
      if (!field) {
        return true;
      }
    }

    return true;
  }
}
