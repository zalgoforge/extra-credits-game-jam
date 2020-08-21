import { Deck } from './deck';
import { SignalizingVariable } from './util/SignalizingVariable';
import { Entity } from './entity';

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
    console.log('End Turn');
  }
}
