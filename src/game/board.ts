import { UniqueObject } from './unique-object';
import { Entity } from './entity';
import { Card } from './card';
import { Signal } from 'signal-slot';

export class Field extends UniqueObject {
  laneIdx: number;
  fieldIdx: number;
  private _board: Board;
  private _entity: Entity | null = null;
  private _card: Card | null = null;

  constructor(board: Board, idx: number, laneIdx: number) {
    super();
    this._board = board;
    this.fieldIdx = idx;
    this.laneIdx = laneIdx;
  }

  entity() {
    return this._entity;
  }

  card() {
    return this._card;
  }

  board() {
    return this._board;
  }

  nextField() {
    if (this.fieldIdx == 0) return null;
    return this._board.field(this.laneIdx, this.fieldIdx-1)
  }

  previousField() {
    if (this.fieldIdx == Board.lanesSize - 1) return null;
    return this._board.field(this.laneIdx, this.fieldIdx+1)
  }

  _setEntity(entity: Entity | null) {
    if (entity && this.entity()) {
      console.error("Wanted to add entity to field, but field is not empty");
      return false;
    }
    this._entity = entity;
    return true;
  }
}

export class Lane extends UniqueObject {
  idx = 0;
  fields = Array<Field>();
  constructor(board: Board, idx: number) {
    super();
    this.idx = idx;
    for (let i = 0; i < Board.lanesSize; i++) {
      this.fields.push(new Field(board, i, idx));
    }
  }

  firstNonEmptyField() {
    for(let field of this.fields) {
      if (field.entity()) return field;
    }
    return null;
  }
}

export class Board extends UniqueObject {
  static lanesCount = 3;
  static lanesSize = 6;

  onEntityAdded = new Signal<Entity>();
  onEntityRemoved = new Signal<Entity>();

  onCardAdded = new Signal<Card>();
  onCardRemoved = new Signal<Card>();

  lanes = Array<Lane>();
  entities = Array<Entity>();

  constructor() {
    super();
    for (let i = 0; i < Board.lanesCount; i++) {
      this.lanes.push(new Lane(this, i));
    }
  }

  addEntity(entity: Entity, field: Field) {
    if (field.entity()) return false;

    entity._setField(field);
    field._setEntity(entity);

    this.entities.push(entity);
    this.onEntityAdded.emit(entity);
    return true;
  }

  destroyEntity(entity: Entity) {
    let index = this.entities.indexOf(entity, 0);
    if (index == -1) return false;

    this.entities.splice(index, 1);
    let field = entity.field();
    field?._setEntity(null);
    entity._setField(null);
    entity.destroy();

    this.onEntityRemoved.emit(entity);
    return true;
  }

  moveEntity(entity: Entity, field: Field) {
    if (field.entity()) return false;
    let index = this.entities.indexOf(entity, 0);
    if (index == -1) return false;

    let oldField = entity.field();
    oldField?._setEntity(null);
    entity._setField(field);
    field._setEntity(entity);

    entity._onMoved(field);

    return true;
  }

  endOfTurn() {
    for (let i = 0; i < Board.lanesSize; i ++) {
      for (let i2 = 0; i2 < Board.lanesCount; i2 ++) {
        let field = this.field(i2, i);
        field.entity()?.endOfTurn();
      }
    }
  }

  field(laneIdx:number, fieldIdx:number) {
    return this.lanes[laneIdx].fields[fieldIdx];
  }
}
