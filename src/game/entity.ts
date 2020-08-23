import { Stat } from './util/Stat';
import { Status, Statuses } from './status';
import { Damage } from './damage';
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
  // TODO add maxHP
  hp = new Stat(10);
  statuses = new Statuses();
  //attack = new SignalizingVariable(1);
  private _field: Field | null = null;

  static onEntityHPChanged = new Signal<Entity>();
  static onEntityMoved = new Signal<Entity>();
  static onEntityStatusChanged = new Signal<EntityStatusUpdate>();

  takeDamage(damage: Damage) {
    let oldHP = this.hp.value();

    // add damage for each soak token
    damage.amount += this.statuses.getValue(Status.Soak);

    this.hp.substract(damage.amount);
    let damageDealt = oldHP - this.hp.value();
    if (damageDealt < 0) damageDealt = 0;
    damage.responseDamageDealt = damageDealt;

    Entity.onEntityHPChanged.emit(this);
  }

  heal(amount: number) {
    this.hp.add(amount);
    Entity.onEntityHPChanged.emit(this);
  }

  field() {
    return this._field;
  }

  _setField(field: Field | null) {
    this._field = field;
  }

  _onMoved(field: Field) {
    Entity.onEntityMoved.emit(this);
  }

  endOfTurn() {
    Actions.substractStatus(this, Status.Soak);

    let poison = this.statuses.getValue(Status.Poison);
    if (poison) Actions.dealDamage(this, new Damage(poison));
  }
}
