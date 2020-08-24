import { UniqueObject } from './unique-object';
import { Target } from './target';
import { Entity } from './entity';
import { Field, Lane } from './board';

export class PlayContext {
  targets = Array<UniqueObject>();

  validTarget(target: UniqueObject) {
    return this.targets.includes(target);
  }

  field() {
    return this.targets[0] as Field;
  }

  lane() {
    return this.targets[0] as Lane;
  }
}

export class Card extends UniqueObject {
  cost: number = 0;
  manaGain = 1;
  id = "<none>";
  title = 'Dummy text';
  description = 'Lorem ipsum';
  passiveDescription = "";
  temporary = false;
  private _field: Field | null = null;

  constructor() {
    super();
  }

  getContext() {
    let ctx = new PlayContext();
    ctx.targets = this.getPossibleTargets();
    return ctx;
  }

  protected getPossibleTargets(): Array<UniqueObject> {
    return [Target.board()];
  }

  onAddedAsPassive() {
  }

  field() {
    return this._field;
  }

  _setField(field: Field | null) {
    this._field = field;
  }

  entityMovedInto(entity:Entity) {

  }

  endOfTurn() { }

  play(ctx: PlayContext) {}
}
