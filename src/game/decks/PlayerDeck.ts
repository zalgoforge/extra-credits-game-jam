import { Deck } from '../deck';

import { Draw } from '../cards/draw';
import { GainMana } from '../cards/gain-mana';
import { HurtSelf } from '../cards/hurt-self';

export class PlayerDeck extends Deck {
  constructor() {
    super();
    for(let i = 0; i < 10; i ++)
      this.add(new Draw());
    for(let i = 0; i < 10; i ++)
      this.add(new GainMana());
      for(let i = 0; i < 10; i ++)
      this.add(new HurtSelf());
  }
}
