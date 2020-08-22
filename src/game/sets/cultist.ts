import { Card, PlayContext } from '../card';
import { Actions } from '../actions';
import { UniqueObject } from '../unique-object';
import { Target } from '../target';

export class Fear extends Card {
  constructor() {
    super();
    this.title = 'Sow Fear';
    this.description = `Push first enemy in line and gain 1 mana`;
  }

  protected getPossibleTargets(): Array<UniqueObject> {
    return Target.anyLane();
  }

  play(ctx: PlayContext) {
    Actions.gainMana(1);

    let target = ctx.lane().firstNonEmptyField();
    if (!target) return;

    let entity = target.entity()
    if (!entity) return;
    Actions.moveBackward(entity);
  }
}

export class Raze extends Card {
  static damage = 2;

  constructor() {
    super();
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
    this.title = 'Drain Health';
    this.cost = 4;
    this.description = `Deal ${DrainHP.damage} dmg to first enemy in lane, and recover health`;
  }

  protected getPossibleTargets(): Array<UniqueObject> {
    return Target.anyLane();
  }

  play(ctx: PlayContext) {
    let target = ctx.lane().firstNonEmptyField();
    if (!target) return;

    Actions.dealDamageToField(target, DrainHP.damage);
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
