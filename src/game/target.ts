import { Field } from './board';
import { GameState } from './game';
import shuffle from 'shuffle-array';

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

  static anyFieldWithEnemy() {
    return Target.anyField().filter(f => f.entity());
  }

  static lastFields() {
    let fields = new Array<Field>();
    for (let lane of Target.anyLane()) {
      fields.push(lane.fields[lane.fields.length - 1]);
    }
    return fields;
  }

  static randomLastEmptyField() {
    let fields = Target.lastFields().filter(f => !f.entity());
    shuffle(fields);
    if (fields.length == 0) return null;
    return fields[0];
  }
}
