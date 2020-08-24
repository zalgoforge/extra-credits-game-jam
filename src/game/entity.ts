import { Stat } from './util/Stat';
import { Status, Statuses } from './status';
import { DamageType, Damage } from './damage';
import { UniqueObject } from './unique-object';
import { Field } from './board';
import { Actions } from './actions';
import { Signal } from 'signal-slot';

export class EntityStatusUpdate {
  entity: Entity;
  status: Status;
  change: number;
  constructor(entity: Entity, status: Status, change: number) {
    this.entity = entity;
    this.status = status;
    this.change = change;
  }
}

export class Entity extends UniqueObject {
  name = "Unknown";
  hp = new Stat(10);
  statuses = new Statuses();
  destroyed = false;
  turnsSinceDestroyed = 0;

  //attack = new SignalizingVariable(1);
  private _field: Field | null = null;

  static onEntityHPChanged = new Signal<Entity>();
  static onEntityMoved = new Signal<Entity>();
  static onEntityStatusChanged = new Signal<EntityStatusUpdate>();

  takeDamage(damage: Damage) {
    let oldHP = this.hp.value();

    // add damage for each soak token
    if (this.statuses.getValue(Status.Soak)) {
      damage.amount += 2;
    }

    if (damage.type != DamageType.PiercingDamage) {
      damage.amount -= this.statuses.getValue(Status.Tough);
    }

    if (damage.amount < 0) damage.amount = 0;

    this.hp.substract(damage.amount);
    let damageDealt = oldHP - this.hp.value();
    if (damageDealt < 0) damageDealt = 0;
    damage.responseDamageDealt = damageDealt;

    Entity.onEntityHPChanged.emit(this);
  }

  field() {
    return this._field;
  }

  _setField(field: Field | null) {
    this._field = field;
  }

  endOfTurn() {
    Actions.substractStatus(this, Status.Soak);

    let poison = this.statuses.getValue(Status.Poison);
    if (poison) Actions.dealDamage(this, new Damage(poison, DamageType.Normal));
  }
}
