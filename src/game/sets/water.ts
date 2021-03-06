import { Card, PlayContext } from '../card';
import { Actions } from '../actions';
import { UniqueObject } from '../unique-object';
import { Target } from '../target';
import { Damage, DamageType } from '../damage';
import { Status } from '../status';
import { Entity, EntityStatusUpdate } from '../entity';

export class WaterPistol extends Card {
  damage = 2;
  soak = 2;

  constructor() {
    super();
    this.id = "water-pistol";
    this.title = 'Water Pistol';
    this.description = `Deal ${this.damage} to first enemy, soaks ${this.soak}`;
  }

  protected getPossibleTargets(): Array<UniqueObject> {
    return Target.anyLane();
  }

  play(ctx: PlayContext) {
    let entity = Target.firstEnemyInLane(ctx.lane());
    if (!entity) return;
    Actions.dealDamage(entity, new Damage(this.damage));
    Actions.addStatus(entity, Status.Soak, this.soak);
  }
}

export class WaterBallon extends Card {
  damage = 2;
  soak = 2;

  constructor() {
    super();
    this.id = "water-ballon";
    this.cost = 2;
    this.title = 'Water Balloon';
    this.description = `Deal ${this.damage} and soaks ${this.soak} to field and all neighbors`;
  }

  protected getPossibleTargets(): Array<UniqueObject> {
    return Target.anyField();
  }

  play(ctx: PlayContext) {
    let fields = Target.fieldsInCrossShape(ctx.field());
    Actions.dealDamageToFields(fields, new Damage(this.damage));
    for (let field of fields) {
      if (field.entity())
        Actions.addStatus(field.entity() as Entity, Status.Soak, this.soak);
    }
  }
}

export class ElectricEel extends Card {
  damage = 2;

  constructor() {
    super();
    this.cost = 3;
    this.id = "electric-eel";
    this.title = 'Electric Eel';
    this.description = `Deal ${this.damage} piercing to all soaked enemies`;
  }

  play(ctx: PlayContext) {
    let fields = Target.anyField().filter( field => ( field.entity() && field.entity()?.statuses.getValue(Status.Soak) )  );
    Actions.dealDamageToFields(fields, new Damage(this.damage, DamageType.PiercingDamage));
  }
}

export class Puddle extends Card {
  soak = 2;

  constructor() {
    super();
    this.id = "puddle";
    this.cost = 4;
    this.title = 'Puddle';
    this.description = `Applies ${this.soak} soak to enemy who steps into it`;
  }

  protected getPossibleTargets(): Array<UniqueObject> {
    return Target.firstFields(4).filter( field => !field.entity() );
  }

  play(ctx: PlayContext) {
    Actions.placeCardOnField(this, ctx.field());
  }

  entityMovedInto(entity:Entity) {
    Actions.addStatus(entity, Status.Soak, this.soak);
  }
}

class GainManaAfterSoak extends Card {
  gainedManainThisTurn = false;

  constructor() {
    super();
    this.id = "GainManaAfterSoak";
    this.passiveDescription = `When you soak first enemy each turn, +1 mana`;
  }

  onAddedAsPassive() {
    Entity.onEntityStatusChanged.do((data: EntityStatusUpdate) => {
      if (data.status != Status.Soak || data.change <= 0) return;
      if (this.gainedManainThisTurn) return;
      Actions.gainMana();
      this.gainedManainThisTurn = true;
    }).bind();
  }

  endOfTurn() {
    super.endOfTurn();
    this.gainedManainThisTurn = false;
  }
}

export class Schadenfreude extends Card {
  constructor() {
    super();
    this.id = "schadenfreude";
    this.cost = 4;
    this.title = 'Schadenfreude';
    this.description = `Gain "When you soak first enemy each turn, +1 mana"`;
  }

  play(ctx: PlayContext) {
    Actions.removeCardFromGame(this);
    Actions.addPassive(new GainManaAfterSoak);
  }
}

export function CreateSet() {
  return [
    new WaterPistol,
    new WaterPistol,

    new WaterBallon,
    new WaterBallon,

    new ElectricEel,
    new ElectricEel,

    new Puddle,
    new Schadenfreude,
   ];
}
