import { Card, PlayContext } from '../card';
import { Actions } from '../actions';
import { TestEnemy } from '../enemies/test-enemy';
import { FastEnemy } from '../enemies/fast-enemy';
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
    if (!this.spawnEnemyAtBack()) return;
    this.turn = 0;
  }

  spawnEnemyAtBack() {
    let field = Target.randomLastEmptyField();
    if (!field) {
      return false;
    }

    const enemies = [
      [() => new TestEnemy, 2],
      [() => new FastEnemy, 1]
    ];

    Actions.spawnEnemy(pick(enemies)(), field);

    return true;
  }
}
