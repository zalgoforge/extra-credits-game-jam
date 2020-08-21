import { SignalizingVariable } from "./util/SignalizingVariable";
import { v4 as uuidv4 } from 'uuid';
import { Damage } from './damage';

export class Entity {
  uuid = uuidv4();

  hp = new SignalizingVariable(10);
  attack = new SignalizingVariable(1);

  takeDamage(damage:Damage) {
    this.hp.substract(damage.amount);
  }
}
