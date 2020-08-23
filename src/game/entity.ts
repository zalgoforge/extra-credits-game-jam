import { Stat } from './util/Stat';
import { Statuses } from './status';
import { Damage } from './damage';
import { UniqueObject } from './unique-object';
import { Field } from './board';
import { Signal } from 'signal-slot';

export class Entity extends UniqueObject {
  name = "Unknown";
  // TODO add maxHP
  hp = new Stat(10);
  statuses = new Statuses();
  //attack = new SignalizingVariable(1);
  private _field: Field | null = null;

  static onEntityHPChanged = new Signal<Entity>();
  static onEntityMoved = new Signal<Entity>();
  static onEntityStatusChanged = new Signal<Entity>();

  takeDamage(damage: Damage) {
    let oldHP = this.hp.value();
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

  endOfTurn() {}
}
