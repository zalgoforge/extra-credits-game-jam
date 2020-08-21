import { Card } from './card';
import { Signal } from 'signal-slot';

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
