import { Deck } from '../deck';

import { Draw } from '../cards/draw';
import { GainMana } from '../cards/gain-mana';
import { ThrowRock } from '../cards/throw-rock';

import { CreateSet as CreateCultistSet } from '../sets/cultist';

export class PlayerDeck extends Deck {
  constructor() {
    super();
    for (let i = 0; i < 3; i++) {
      this.add(new Draw());
      this.add(new GainMana());
      this.add(new ThrowRock());
      this.addCards(CreateCultistSet());
    }
  }



}
