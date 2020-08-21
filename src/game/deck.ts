import { Card } from './card';

export class Deck {
  cards = Array<Card>();
  OnCardsChanged = new Signal<Card>();

  constructor() {
    this.cards.push(new Card());
    this.cards.push(new Card());
    this.cards.push(new Card());
    this.cards.push(new Card());
  }

  draw() : Card {
    return this.cards.pop() as Card;
  }

  add(card:Card) {

  }

  shuffle() {}
}
