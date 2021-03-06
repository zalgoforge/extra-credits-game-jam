import { Actions } from './actions';
import { Target } from './target';
import { TestEnemy } from './enemies/enemies';

export class Cheats {
  static addMana() {
    Actions.gainMana();
  }

  static addTestEnemy() {
    let enemy = new TestEnemy;
    let field = Target.randomLastEmptyField();
    if (!field) {
      console.log("Missing space to spawn enemy!");
      return;
    }
    Actions.spawnEnemy(enemy, field);
  }
}
