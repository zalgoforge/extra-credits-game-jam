import { Deck } from './deck';
import { Card } from './card';
import { UniqueObject } from './unique-object';
import { PlayerDeck } from './decks/PlayerDeck';
import { SignalizingVariable } from './util/SignalizingVariable';
import { Entity } from './entity';
import { Actions } from './actions';
import { Board } from './board';
import { Cheats } from './cheats';
import { Signal } from 'signal-slot';
import { SpawnEnemies } from './enemiesCards/spawn-enemies';

export class Player {
  deck: Deck = new PlayerDeck();
  hand = new Deck();
  discard = new Deck();
  mana = new SignalizingVariable();
  handLimit = new SignalizingVariable(6);
  entity = new Entity();

  onDiscardedCard = new Signal<Card>();

  constructor() {
    this.entity.name = "Player";
  }
}

export class GameState {
  turnCount = new SignalizingVariable();

  player = new Player();
  passiveEffects = new Deck();
  board = new Board();
  gameOver = false;
  onGameOver = new Signal<number>();
  onTurnEnd = new Signal<number>();

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
    Cheats.addTestEnemy();
    Actions.addPassive(new SpawnEnemies());
  }

  endTurn() {
    if (this.gameOver) return;
    Actions.loseAllMana();
    Actions.drawToHandSize();

    this.player.entity.endOfTurn();
    this.board.endOfTurn();
    this.player.hand.endOfTurn();
    this.passiveEffects.endOfTurn();

    if (this.player.entity.hp.value() <= 0) {
      this.gameOver = true;
      this.onGameOver.emit(0);
    }

    this.turnCount.add(1);
    console.log('End Turn');
  }

  playCard(cardId: string, targetId: string) {
    if (this.gameOver) return;
    let card = this.player.hand.findById(cardId);
    if (!card) {
      console.error(`Cannot find card to play ${cardId}!`);
      return;
    }

    let target = UniqueObject.findId(targetId);
    Actions.playCard(card, target);
  }

  discardCard(cardId: string) {
    if (this.gameOver) return;
    let card = this.player.hand.findById(cardId);
    if (!card) {
      console.error(`Cannot find card to discard ${cardId}!`);
      return;
    }
    Actions.discardCardForMana(card);
  }

  doCheat(cheat: string) {
    Cheats.addTestEnemy();
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
