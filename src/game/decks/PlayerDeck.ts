import { Deck } from '../deck';

import { Draw } from '../cards/draw';
import { GainMana } from '../cards/gain-mana';

export class PlayerDeck extends Deck {
  constructor() {
    super();
    for(let i = 0; i < 15; i ++)
      this.add(new Draw());
    for(let i = 0; i < 15; i ++)
      this.add(new GainMana());
  }
}
