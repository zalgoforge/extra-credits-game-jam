import { Enemy } from './enemy';
import { Actions } from '../actions';

let additionalHP = 2;

export class TestEnemy extends Enemy {
  constructor() {
    super();
    this.name = "TestEnemy";
    this.hp.setMax(5 + additionalHP);
  }
}

export class FastEnemy extends Enemy {
  constructor() {
    super();
    this.name = "FastEnemy";
    this.speed = 2;
    this.hp.setMax(3 + additionalHP);
  }
}

export class HealerEnemy extends Enemy {
  healAmount = 2;

  constructor() {
    super();
    this.name = "HealerEnemy";
    this.hp.setMax(6 + additionalHP);
  }

  endOfTurn() {
    super.endOfTurn();
  }
}


export class BigEnemy extends Enemy {
  regen = 2;

  constructor() {
    super();
    this.name = "BigEnemy";
    this.hp.setMax(12 + additionalHP);
  }

  endOfTurn() {
    super.endOfTurn();
    Actions.heal(this, this.regen);
  }
}
