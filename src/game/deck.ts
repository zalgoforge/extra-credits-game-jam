import { Card } from './card';
import { Signal } from 'signal-slot';

export class Deck {
  cards = Array<Card>();
  onCardsChanged = new Signal<Card>();

  constructor() {
    this.cards.push(new Card());
    this.cards.push(new Card());
    this.cards.push(new Card());
    this.cards.push(new Card());
  }

  draw() : Card {
    let card = this.cards.pop() as Card;
    this.onCardsChanged.emit(card);
    return card;
  }

  add(card:Card) {
    this.cards.push(card);
    this.onCardsChanged.emit(card);
  }

  shuffle() {}
}
