import { Card, PlayContext } from '../card';
import { Actions } from '../actions';

export class GainMana extends Card {
  static manaGain = 3;

  constructor() {
    super();
    this.title = 'Gain mana';
    this.description = `Gain ${GainMana.manaGain} mana`;
    this.cost = 1;
  }

  play(ctx: PlayContext) {
    Actions.gainMana(GainMana.manaGain);
  }
}
