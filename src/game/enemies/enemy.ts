import { Entity } from '../entity';
import { Actions } from '../actions';

export class Enemy extends Entity {
  constructor() {
    super();
    this.name = "Enemy";
    this.hp.set(3);
  }

  atLastField() {
    if (!this.field()) return false;
    return this.field()?.fieldIdx == 0;
  }

  endOfTurn() {
    if (this.atLastField()) {
      Actions.dealDamageToPlayer(this.hp.value());
      Actions.killEntity(this);
    } else {
      Actions.moveForward(this);
    }
  }
}
