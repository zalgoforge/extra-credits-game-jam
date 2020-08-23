import { Card, PlayContext } from '../card';
import { Actions } from '../actions';
import { UniqueObject } from '../unique-object';
import { Target } from '../target';
import { Damage } from '../damage';

export class Fear extends Card {
  constructor() {
    super();
    this.id = "sow-fear";
    this.title = 'Sow Fear';
    this.description = `Push first enemy in line and gain 1 mana`;
  }

  protected getPossibleTargets(): Array<UniqueObject> {
    return Target.anyLane();
  }

  play(ctx: PlayContext) {
    Actions.gainMana(1);

    let entity = Target.firstEnemyInLane(ctx.lane());
    if (!entity) return;
    Actions.moveBackward(entity);
  }
}

export class Raze extends Card {
  static damage = 2;

  constructor() {
    super();
    this.id = "raze";
    this.title = 'Raze';
    this.cost = 1;
    this.description = `Deal ${Raze.damage} dmg to all enemies in column`;
  }

  protected getPossibleTargets(): Array<UniqueObject> {
    return Target.anyFieldWithEnemy();
  }

  play(ctx: PlayContext) {
    let fields = Target.allFieldsInColumn(ctx.field().fieldIdx);
    for(let field of fields) {
      Actions.dealDamageToField(field, Raze.damage);
    }

  }
}

export class DrainHP extends Card {
  static damage = 3;

  constructor() {
    super();
    this.id = "drain-hp";
    this.title = 'Drain Health';
    this.cost = 4;
    this.description = `Deal ${DrainHP.damage} dmg to first enemy in lane, and recover health`;
  }

  protected getPossibleTargets(): Array<UniqueObject> {
    return Target.anyLane();
  }

  play(ctx: PlayContext) {
    let entity = Target.firstEnemyInLane(ctx.lane());
    if (!entity) return;

    let dmg = new Damage(DrainHP.damage);
    Actions.dealDamage(entity, dmg);
    // TODO heal only amount of damage dealt
    Actions.healPlayer(DrainHP.damage);
  }
}


export function CreateSet() {
  return [
    new Fear,
    new Raze,
    new DrainHP,
   ];
}
