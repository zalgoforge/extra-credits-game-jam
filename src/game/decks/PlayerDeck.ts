import { Deck } from '../deck';

import { Draw } from '../cards/draw';
import { GainMana } from '../cards/gain-mana';

export class PlayerDeck extends Deck {
  constructor() {
    super();
    for(let i = 0; i < 15; i ++)
      this.cards.push(new Draw());
    for(let i = 0; i < 15; i ++)
      this.cards.push(new GainMana());
  }
}
