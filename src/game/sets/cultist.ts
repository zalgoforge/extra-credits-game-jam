import { Card, PlayContext } from '../card';
import { Actions } from '../actions';
import { UniqueObject } from '../unique-object';
import { Target } from '../target';
import { Damage } from '../damage';

export class Fear extends Card {
  constructor() {
    super();
    this.id = "teen-poetry";
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
  damage = 2;

  constructor() {
    super();
    this.id = "drone-strike";
    this.title = 'Raze';
    this.cost = 1;
    this.description = `Deal ${this.damage} dmg to all enemies in column`;
  }

  protected getPossibleTargets(): Array<UniqueObject> {
    return Target.anyFieldWithEnemy();
  }

  play(ctx: PlayContext) {
    let fields = Target.allFieldsInColumn(ctx.field().fieldIdx);
    for(let field of fields) {
      Actions.dealDamageToField(field, new Damage(this.damage));
    }

  }
}

export class DrainHP extends Card {
  damage = 3;

  constructor() {
    super();
    this.id = "grumble";
    this.title = 'Drain Health';
    this.cost = 4;
    this.description = `Deal ${this.damage} dmg to first enemy in lane, and recover health`;
  }

  protected getPossibleTargets(): Array<UniqueObject> {
    return Target.anyLane();
  }

  play(ctx: PlayContext) {
    let entity = Target.firstEnemyInLane(ctx.lane());
    if (!entity) return;

    let dmg = new Damage(this.damage);
    Actions.dealDamage(entity, dmg);
    Actions.healPlayer(dmg.responseDamageDealt);
  }
}

export class ToyGun extends Card {
  damage1 = 2;
  damage2 = 4;

  constructor() {
    super();
    this.id = "toy-gun";
    this.title = 'Toy Gun';
    this.cost = 1;
    this.description = `Deal ${this.damage1} dmg to first enemy then ${this.damage2} one field further.`;
  }

  protected getPossibleTargets(): Array<UniqueObject> {
    return Target.anyLane();
  }

  play(ctx: PlayContext) {
    let entity = Target.firstEnemyInLane(ctx.lane());
    if (!entity) return;

    let dmg = new Damage(this.damage1);
    Actions.dealDamage(entity, dmg);
    let target2 = entity.field()?.previousField()?.entity();
    if (!target2) return;

    dmg = new Damage(this.damage2);
    Actions.dealDamage(target2, dmg);
  }
}

export class MagicUp extends Card {
  damage = 2;
  bonusDmg = 0;

  constructor() {
    super();
    this.id = "magic-up";
    this.title = 'Magic up';
    this.cost = 2;
    this.updateDesc();
  }

  protected getPossibleTargets(): Array<UniqueObject> {
    return Target.anyFieldWithEnemy();
  }

  updateDesc() {
    this.description = `Deal ${this.bonusDmg + this.damage} dmg. +2 if this stays in your hand at end of turn. (up to 10)`;
  }

  play(ctx: PlayContext) {
    Actions.dealDamageToField(ctx.field(), new Damage(this.bonusDmg + this.damage));
    this.bonusDmg = 0;
  }

  endOfTurn() {
    this.bonusDmg += 2;
    if (this.bonusDmg > 8) this.bonusDmg = 8;
    this.updateDesc();
  }

  discarded() {
    this.bonusDmg = 0;
  }
}


export function CreateSet() {
  return [
    new Fear,
    new Fear,

    new Raze,
    new Raze,

    new ToyGun,
    new ToyGun,

    new DrainHP,
    new MagicUp,
   ];
}
