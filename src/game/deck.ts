import { Card } from './card';
import { Signal } from 'signal-slot';
let shuffleArray = require('shuffle-array');

export class Deck {
  cards = Array<Card>();
  onCardsChanged = new Signal<number>();

  constructor() {}

  draw(): Card {
    let card = this.cards.pop() as Card;
    this.onCardsChanged.emit(0);
    return card;
  }

  add(card: Card) {
    this.cards.push(card);
    this.onCardsChanged.emit(0);
  }

  addCards(cards:Card[]) {
    for (let card of cards) {
      this.add(card);
    }
  }

  addAllCardsFrom(deck:Deck) {
    this.cards = deck.cards;
    deck.cards = [];
    deck.onCardsChanged.emit(0);
    this.onCardsChanged.emit(0);
  }

  remove(card: Card) {
    let index = this.cards.indexOf(card, 0);
    if (index == -1) return false;
    this.cards.splice(index, 1);
    this.onCardsChanged.emit(0);
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

  empty() {
    return this.size() == 0;
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
