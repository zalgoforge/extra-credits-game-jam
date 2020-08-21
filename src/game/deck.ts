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
    let card = this.cards.pop() as Card;
    this.OnCardsChanged.emit(card);
    return card;
  }

  add(card:Card) {
    this.cards.push(card);
    this.OnCardsChanged.emit(card);
  }

  shuffle() {}
}
