import { Deck } from '../deck';
import { CreateSet as CreateTestSet } from '../sets/test';


export class TestDeck extends Deck {
  constructor() {
    super();

    this.addCards(CreateTestSet());
  }



}
