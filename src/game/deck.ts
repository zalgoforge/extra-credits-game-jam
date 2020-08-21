import { Card } from './card';
import { Signal } from 'signal-slot';

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

  shuffle() {}

  size() {
    return this.cards.length;
  }
}

export class PlayerDeck extends Deck {
  constructor() {
    super();
    for(let i = 0; i < 30; i ++)
      this.cards.push(new Card());
  }
}
