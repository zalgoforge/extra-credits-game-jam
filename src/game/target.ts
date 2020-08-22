import { Field, Lane, Board } from './board';
import { GameState } from './game';

export class Target {
  static board() {
    return GameState.instance().board;
  }

  static anyLane() {
    return GameState.instance().board.lanes;
  }
}

