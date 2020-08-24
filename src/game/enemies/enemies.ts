import { Enemy } from './enemy';
import { Actions } from '../actions';
import { Target } from '../target';
import { Entity } from '../entity';
import { Status } from '../status';

let additionalHP = 2;

export function AddHPToEnemies(hp: number) {
  additionalHP += hp;
}

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
    let fields = Target.allFieldsInLane(this.field()?.laneIdx || 0);
    let otherEnemies = fields.filter( f => f.entity() && f.entity() != this ).map( f => f.entity() as Entity );
    for(let enemy of otherEnemies) {
      Actions.addMaxHealth(enemy, this.healAmount);
    }

    super.endOfTurn();
  }
}

export class ToughEnemy extends Enemy {
  healAmount = 2;

  constructor() {
    super();
    this.name = "ToughEnemy";
    this.hp.setMax(6 + additionalHP);
    this.statuses.add(Status.Tough, 2);
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
