import { Deck } from './deck';
import { UniqueObject } from './unique-object';
import { PlayerDeck } from './decks/PlayerDeck';
import { SignalizingVariable } from './util/SignalizingVariable';
import { Entity } from './entity';
import { Actions } from './actions';
import { Board } from './board';
import { Cheats } from './cheats';

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
    this.player.entity.endOfTurn();
    Actions.drawToHandSize();
    this.board.endOfTurn();
    console.log('End Turn');
  }

  playCard(cardId: string, targetId: string) {
    let card = this.player.hand.findById(cardId);
    if (!card) {
      console.error(`Cannot find card to play ${cardId}!`);
      return;
    }

    let target = UniqueObject.findId(targetId);
    Actions.playCard(card, target);
  }

  discardCard(cardId: string) {
    let card = this.player.hand.findById(cardId);
    if (!card) {
      console.error(`Cannot find card to discard ${cardId}!`);
      return;
    }
    Actions.discardCardForMana(card);
  }

  doCheat(cheat: string) {
    Cheats.addMana();
  }

  getPossibleTargetsForCard(cardId: string): string[] {
    let card = this.player.hand.findById(cardId);
    if (!card) {
      console.error(`Cannot find card ${cardId} for targets!`);
      return [];
    }

    let ctx = card.getContext();
    return ctx.targets.map((target) => target.uuid);
  }
}
