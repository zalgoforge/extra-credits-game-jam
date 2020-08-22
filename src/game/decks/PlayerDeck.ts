import { Deck } from '../deck';

import { Draw } from '../cards/draw';
import { GainMana } from '../cards/gain-mana';
import { HurtSelf } from '../cards/hurt-self';
import { ThrowRock } from '../cards/throw-rock';
import { Snipe } from '../cards/snipe';
import { PushBack } from '../cards/push-back';

export class PlayerDeck extends Deck {
  constructor() {
    super();
    for (let i = 0; i < 5; i++) {
      this.add(new Draw());
      this.add(new GainMana());
      this.add(new HurtSelf());
      this.add(new ThrowRock());
      this.add(new Snipe());
      this.add(new PushBack());
    }
  }
}
