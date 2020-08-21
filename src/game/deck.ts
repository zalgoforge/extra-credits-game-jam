import { Card } from './card';
import { Signal } from 'signal-slot';
let shuffleArray = require('shuffle-array');

export class Deck {
  cards = Array<Card>();
  onCardsChanged = new Signal<Card>();

  constructor() {

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

  shuffle() {
    shuffleArray(this.cards);
  }

  size() {
    return this.cards.length;
  }
}
