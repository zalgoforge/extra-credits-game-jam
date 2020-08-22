import { Actions } from './actions';
import { Target } from './target';
import { TestEnemy } from './enemies/test-enemy';

export class Cheats {
  static addMana() {
    Actions.gainMana();
  }

  static addTestEnemy() {
    let enemy = new TestEnemy;
    let field = Target.randomLastEmptyField();
    if (!field) return;
    Actions.spawnEnemy(enemy, field);
  }
}
