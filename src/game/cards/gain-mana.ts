import { Card } from '../card';
import { Actions } from '../actions';

export class GainMana extends Card {
  constructor() {
    super();
    this.title = "Gain mana";
    this.description = "Gain 3 mana";
    this.cost = 1;
  }

  play() {
    Actions.gainMana(3);
  }
}
