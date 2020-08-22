import { Field } from './board';
import { GameState } from './game';

export class Target {
  static board() {
    return GameState.instance().board;
  }

  static anyLane() {
    return GameState.instance().board.lanes;
  }

  static anyField() {
    let fields = new Array<Field>();
    for (let lane of Target.anyLane()) {
      fields = fields.concat(lane.fields);
    }
    return fields;
  }

  static lastFields() {
    let fields = new Array<Field>();
    for (let lane of Target.anyLane()) {
      fields.push(lane.fields[lane.fields.length - 1]);
    }
    return fields;
  }
}
