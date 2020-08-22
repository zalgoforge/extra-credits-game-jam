import { Field, Lane, Board } from './board';
import { GameState } from './game';

export class Target {
  static anyLane() {
    return GameState.instance().board.lanes;
  }
}

