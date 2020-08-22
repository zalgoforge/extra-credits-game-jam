import { Deck } from './deck';
import { PlayerDeck } from './decks/PlayerDeck';
import { SignalizingVariable } from './util/SignalizingVariable';
import { Entity } from './entity';
import { Actions } from './actions';
import { Board } from './board';

export class Player {
  deck: Deck = new PlayerDeck();
  hand = new Deck();
  mana = new SignalizingVariable();
  handLimit = new SignalizingVariable(6);
  entity = new Entity();
}

export class GameState {
  player = new Player();
  board = new Board();

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
    Actions.drawToHandSize();
    console.log('End Turn');
  }

  playCard(cardId: string, targetId: string) {
    let card = this.player.hand.findById(cardId);
    if (!card) {
      console.error(`Cannot find card to play ${cardId}!`);
      return;
    }

    Actions.playCard(card);
  }

  discardCard(cardId: string) {
    let card = this.player.hand.findById(cardId);
    if (!card) {
      console.error(`Cannot find card to discard ${cardId}!`);
      return;
    }
    Actions.discardCardForMana(card);

  }

  getPossibleTargetsForCard(cardId: string): string[] {
    return [];
  }
}
