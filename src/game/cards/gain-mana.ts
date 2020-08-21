import { Card } from '../card';
import { Actions } from '../actions';

export class GainMana extends Card {
  constructor() {
    super();
    this.title = "Gain mana";
    this.description = "Gain one mana";
  }

  play() {
    Actions.gainMana();
  }
}
