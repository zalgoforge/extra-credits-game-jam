import { Deck } from './deck';

export class Player {
    deck = new Deck();
    hand = new Deck();
}

export class GameState {
    player = new Player();

    private static _instance: GameState;
    public static instance(): GameState {
        if (!GameState._instance) {
            GameState._instance = new GameState();
        }
        return GameState._instance;
    }
}