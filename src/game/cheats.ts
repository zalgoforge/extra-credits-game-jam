import { Actions } from './actions';
import { Entity } from './entity';
import { Target } from './target';


export class Cheats {
  static addMana() {
    Actions.gainMana();
  }

  static addTestEnemy() {
    let enemy = new Entity;
    let field = Target.randomLastEmptyField();
    if (!field) return;
    Actions.spawnEnemy(enemy, field);
  }
}
