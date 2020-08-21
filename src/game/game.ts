import { Deck } from './deck';
import { Card } from './Card';
import { PlayerDeck } from './decks/PlayerDeck';
import { SignalizingVariable } from './util/SignalizingVariable';
import { Entity } from './entity';
import { Actions } from './actions';

export class Player {
  deck: Deck = new PlayerDeck();
  hand = new Deck();
  mana = new SignalizingVariable();
  handLimit = new SignalizingVariable(6);
  entity = new Entity();
}

export class GameState {
  player = new Player();

  private static _instance: GameState;
  static instance(): GameState {
    if (!GameState._instance) {
      GameState._instance = new GameState();
      GameState._instance.initialize();
    }
    return GameState._instance;
  }

  protected initialize() {
    Actions.shuffleDeck();
    Actions.drawToHandSize();
  }

  endTurn() {
    Actions.drawCard();
    console.log('End Turn');
  }

  playCard(cardId: string, targetId: string) {}

  discardCard(cardId: string) {
    let card = this.player.hand.findById(cardId);
    if (!card) {
      console.error(`Cannot find card to discard ${cardId}!`);
      return;
    }
    Actions.discardCard(card);

  }

  getPossibleTargetsForCard(cardId: string): string[] {
    return [];
  }
}
