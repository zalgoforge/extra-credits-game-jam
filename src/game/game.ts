import { Deck, PlayerDeck } from './deck';
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
    Actions.drawToHandSize();
  }

  endTurn() {
    Actions.drawCard();
    console.log('End Turn');
  }

  playCard(cardId:string, targetId:string) {

  }

  discardCard(cardId:string) {

  }

  getPossibleTargetsForCard(cardId:string): string[] {
    return [];
  }
}
