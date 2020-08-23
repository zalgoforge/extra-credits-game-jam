import { Enemy } from './enemy';
import { Actions } from '../actions';

export class BigEnemy extends Enemy {
  regen = 2;

  constructor() {
    super();
    this.name = "BigEnemy";
    this.hp.setMax(12);
  }

  endOfTurn() {
    super.endOfTurn();
    Actions.heal(this, this.regen);
  }
}
