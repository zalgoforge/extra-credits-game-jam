import { Card, PlayContext } from '../card';
import { Actions } from '../actions';
import { UniqueObject } from '../unique-object';
import { Target } from '../target';
import { Damage } from '../damage';

export class WaterPistol extends Card {
  damage = 2;

  constructor() {
    super();
    this.id = "water-pistol";
    this.title = 'Water Pistol';
    this.description = `Deal ${this.damage} dmg to first enemy in lane`;
  }

  protected getPossibleTargets(): Array<UniqueObject> {
    return Target.anyLane();
  }

  play(ctx: PlayContext) {
    // TODO soak
    let entity = Target.firstEnemyInLane(ctx.lane());
    if (!entity) return;
    Actions.dealDamage(entity, new Damage(this.damage));
  }
}

export class WaterBallon extends Card {
  damage = 2;

  constructor() {
    super();
    this.id = "water-ballon";
    this.cost = 2;
    this.title = 'Water Balloon';
    this.description = `Deal ${this.damage} to field and all neighbors`;
  }

  protected getPossibleTargets(): Array<UniqueObject> {
    return Target.anyField();
  }

  play(ctx: PlayContext) {
    let fields = Target.fieldsInCrossShape(ctx.field());
    Actions.dealDamageToFields(fields, this.damage);
  }
}

export class ElectricEel extends Card {
  damage = 2;

  constructor() {
    super();
    this.cost = 3;
    this.id = "electric-eel";
    this.title = 'Electric Eel';
    this.description = `Deal ${this.damage} to all soaked enemies`;
  }

  protected getPossibleTargets(): Array<UniqueObject> {
    return Target.anyField();
  }

  play(ctx: PlayContext) {
    let fields = Target.anyField().filter( field => field.entity());
    Actions.dealDamageToFields(fields, this.damage);
  }
}



export function CreateSet() {
  return [
    new WaterPistol,
    new WaterBallon,
    new ElectricEel,
   ];
}
