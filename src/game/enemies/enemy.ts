import { Entity } from '../entity';
import { Actions } from '../actions';

export class Enemy extends Entity {
  speed = 1;

  constructor() {
    super();
    this.name = "Enemy";
    this.hp.setMax(3);
  }

  atLastField() {
    if (!this.field()) return false;
    return this.field()?.fieldIdx == 0;
  }

  endOfTurn() {
    for (let i = 0; i < this.speed; i ++) {
      if (this.atLastField()) {
        Actions.dealDamageToPlayer(this.hp.value());
        Actions.killEntity(this);
        break;
      } else {
        Actions.moveForward(this);
      }
    }

  }
}
