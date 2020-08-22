import { SignalizingVariable } from "./util/SignalizingVariable";
import { Damage } from './damage';
import { UniqueObject } from './unique-object';

export class Entity extends UniqueObject {

  hp = new SignalizingVariable(10);
  attack = new SignalizingVariable(1);

  takeDamage(damage:Damage) {
    this.hp.substract(damage.amount);
  }

  endOfTurn() {

  }
}
