import { UniqueObject } from './unique-object';
import { Entity } from './entity';
import { Signal } from 'signal-slot';

export class Field extends UniqueObject {
  laneIdx = 0;
  fieldIdx = 0;
  private _entity: Entity | null = null;

  constructor(idx: number) {
    super();
    this.fieldIdx = idx;
  }

  entity() : Entity | null {
    return this._entity;
  }

  _setEntity(entity: Entity | null) {
    if (this.entity()) {
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
  onEntityRemoved = new Signal<Entity>();

  lanes = Array<Lane>();
  entities = Array<Entity>();

  constructor() {
    super();
    for (let i = 0; i < Board.lanesCount; i++) {
      this.lanes.push(new Lane(i));
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

  entityDestroyed(entity: Entity) {
    let index = this.entities.indexOf(entity, 0);
    if (index == -1) return false;

    this.entities.splice(index, 1);
    let field = entity.field();
    field?._setEntity(null);
    entity._setField(null);

    this.onEntityRemoved.emit(entity);
    return true;
  }

  endOfTurn() {
    for (let entity of this.entities) {
      entity.endOfTurn();
    }
  }
}
