import { UniqueObject } from './unique-object';
import { Entity } from './entity';
import { Signal } from 'signal-slot';

export class Field extends UniqueObject {
  laneIdx = 0;
  fieldIdx = 0;
  constructor(idx: number) {
    super();
    this.fieldIdx = idx;
  }
}

export class Lane extends UniqueObject {
  idx = 0;
  fields = Array<Field>();
  constructor(idx: number) {
    super();
    this.idx = idx;
    for (let i = 0; i < Board.lanesSize; i++) {
      this.fields.push(new Field(i));
    }
  }
}

export class Board extends UniqueObject {
  static lanesCount = 3;
  static lanesSize = 6;

  onEntityAdded = new Signal<Entity>();

  lanes = Array<Lane>();
  entities = Array<Entity>();

  constructor() {
    super();
    for (let i = 0; i < Board.lanesCount; i++) {
      this.lanes.push(new Lane(i));
    }
  }

  addEntity(entity: Entity, field: Field) {
    this.entities.push(entity);
    this.onEntityAdded.emit(entity);
  }

  endOfTurn() {
    for (let entity of this.entities) {
      entity.endOfTurn();
    }
  }
}
