import { Deck } from './deck';
import { SignalizingVariable } from './util/SignalizingVariable';
import { Entity } from './entity';
import { Actions } from './actions';

export class Player {
  deck = new Deck();
  hand = new Deck();
  mana = new SignalizingVariable();
  entity = new Entity();
}

export class GameState {
  player = new Player();

  private static _instance: GameState;
  static instance(): GameState {
    if (!GameState._instance) {
      GameState._instance = new GameState();
    }
    return GameState._instance;
  }

  endTurn() {
    Actions.drawCard();
    console.log('End Turn');
  }

  playCard(cardId:string, targetId:string) {

  }

  getPossibleTargetsForCard(cardId:string): string[] {
    return [];
  }
}
