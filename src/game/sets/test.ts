import { Card, PlayContext } from '../card';
import { Actions } from '../actions';
import { UniqueObject } from '../unique-object';
import { Target } from '../target';
import { Damage } from '../damage';

export class Kill extends Card {
  static damage = 2;

  constructor() {
    super();
    this.title = 'Kill';
    this.description = `Kill enemy in field`;
  }

  protected getPossibleTargets(): Array<UniqueObject> {
    return Target.anyFieldWithEnemy();
  }

  play(ctx: PlayContext) {
    Actions.killEntity(ctx.field()!.entity());
  }
}


export function CreateSet() {
  return [
    new Kill,
    new Kill,
    new Kill,
    new Kill,
    new Kill,
    new Kill,
    new Kill,
    new Kill,
   ];
}
