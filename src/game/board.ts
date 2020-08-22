import { UniqueObject } from './unique-object';

export class Field extends UniqueObject {

}

export class Lane extends UniqueObject {
  fields = Array<Field>();
  constructor() {
    super();
    for(let i = 0; i < Board.lanesSize; i++) {
      this.fields.push(new Field);
    }
  }
}

export class Board extends UniqueObject {
  static lanesCount = 3;
  static lanesSize = 6;

  lanes = Array<Lane>();

  constructor() {
    super();
    for(let i = 0; i < Board.lanesCount; i++) {
      this.lanes.push(new Lane);
    }
  }
}
