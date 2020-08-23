import { Field, Lane, Board } from './board';
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

  static allFieldsInColumn(idx:number) {
    let fields = new Array<Field>();
    for(let lane of Target.anyLane()) {
      fields.push(lane.fields[idx]);
    }
    return fields;
  }

  static allFieldsInLane(idx:number) {
    return Target.anyLane()[idx].fields;
  }

  static anyFieldWithEnemy() {
    return Target.anyField().filter(f => f.entity());
  }

  static anyFieldWithoutEnemy() {
    return Target.anyField().filter(f => !f.entity());
  }

  static firstFields(columns = 1) {
    return Target.anyField().filter( field => field.fieldIdx < columns );
  }

  static lastFields(columns = 1) {
    return Target.anyField().filter( field => field.fieldIdx >= Board.lanesSize - columns );
  }

  static randomLastEmptyField(columns = 1) {
    let fields = Target.lastFields(columns).filter(f => !f.entity());
    shuffle(fields);
    if (fields.length == 0) return null;
    return fields[0];
  }

  static firstEnemyInLane(lane: Lane) {
    for(let field of lane.fields) {
      if (field.entity()) return field.entity();
    }
    return null;
  }

  static fieldsInCrossShape(field: Field) {
    let fields = [field];

    let addIfExists = (laneIdx: number, fieldIdx: number) => {
      let field = Target.board().field(laneIdx, fieldIdx);
      if (field) fields.push(field);
    };

    addIfExists(field.laneIdx - 1, field.fieldIdx);
    addIfExists(field.laneIdx + 1, field.fieldIdx);
    addIfExists(field.laneIdx, field.fieldIdx - 1);
    addIfExists(field.laneIdx, field.fieldIdx + 1);

    return fields;
  }
}
