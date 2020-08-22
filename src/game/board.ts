import { v4 as uuidv4 } from 'uuid';

export class Field {
  uuid = uuidv4();
}

export class Lane {
  uuid = uuidv4();
  fields = Array<Field>();
  constructor() {
    for(let i = 0; i < Board.lanesSize; i++) {
      this.fields.push(new Field);
    }
  }
}

export class Board {
  uuid = uuidv4();
  static lanesCount = 3;
  static lanesSize = 6;

  lanes = Array<Lane>();

  constructor() {
    for(let i = 0; i < Board.lanesCount; i++) {
      this.lanes.push(new Lane);
    }
  }
}
