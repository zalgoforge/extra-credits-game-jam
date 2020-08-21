import { Card } from './card';

export class Deck {
  cards = Array<Card>();

  constructor() {
    this.cards.push(new Card());
    this.cards.push(new Card());
    this.cards.push(new Card());
    this.cards.push(new Card());
  }

  draw() {}

  shuffle() {}
}
