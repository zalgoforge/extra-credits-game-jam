import { Entity } from '../entity';
import { Actions } from '../actions';

export class TestEnemy extends Entity {
  constructor() {
    super();
    this.name = "Test";
  }

  endOfTurn() {
    Actions.moveForward(this);
  }
}
