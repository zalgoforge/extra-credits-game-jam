import { SignalizingVariable } from './util/SignalizingVariable';
import { Damage } from './damage';
import { UniqueObject } from './unique-object';
import { Field } from './board';
import { Signal } from 'signal-slot';

export class Entity extends UniqueObject {
  name = "Unknown";
  hp = new SignalizingVariable(10);
  attack = new SignalizingVariable(1);
  private _field: Field | null = null;

  static onEntityHPChanged = new Signal<Entity>();

  takeDamage(damage: Damage) {
    this.hp.substract(damage.amount);
    Entity.onEntityHPChanged.emit(this);
  }

  field() {
    return this._field;
  }

  _setField(field: Field | null) {
    this._field = field;
  }

  endOfTurn() {}
}
