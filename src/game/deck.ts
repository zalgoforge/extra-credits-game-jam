import { Card } from './card';
import { Signal } from 'signal-slot';
let shuffleArray = require('shuffle-array');

export class Deck {
  cards = Array<Card>();
  onCardsChanged = new Signal<Card>();

  constructor() {}

  draw(): Card {
    let card = this.cards.pop() as Card;
    this.onCardsChanged.emit(card);
    return card;
  }

  add(card: Card) {
    this.cards.push(card);
    this.onCardsChanged.emit(card);
  }

  remove(card: Card) {
    let index = this.cards.indexOf(card, 0);
    if (index == -1) return false;
    this.cards.splice(index, 1);
    this.onCardsChanged.emit(card);
    return true;
  }

  findById(id: string) {
    let idx = this.cards.findIndex((card) => card.uuid == id);
    if (idx == -1) return null;
    return this.cards[idx];
  }

  shuffle() {
    shuffleArray(this.cards);
  }

  size() {
    return this.cards.length;
  }

  endOfTurn() {
    for (let card of this.cards) {
      card.endOfTurn();
    }
  }
}
