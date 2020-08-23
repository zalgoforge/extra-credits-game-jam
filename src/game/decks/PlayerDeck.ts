import { Deck } from '../deck';

import { CreateSet as CreateCultistSet } from '../sets/cultist';
import { CreateSet as CreateWaterSet } from '../sets/water';
import { CreateSet as CreateTestSet } from '../sets/test';

export class PlayerDeck extends Deck {
  constructor() {
    super();
    for (let i = 0; i < 3; i++) {
      this.addCards(CreateCultistSet());
      this.addCards(CreateWaterSet());
      this.addCards(CreateTestSet());
    }
  }



}
