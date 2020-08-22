import { Card, PlayContext } from '../card';
import { Actions } from '../actions';
import { UniqueObject } from '../unique-object';
import { Target } from '../target';

export class Snipe extends Card {
  static damage = 2;

  constructor() {
    super();
    this.title = 'Snipe';
    this.description = `Deal ${Snipe.damage} dmg to enemy in field`;
  }

  protected getPossibleTargets(): Array<UniqueObject> {
    return Target.anyFieldWithEnemy();
  }

  play(ctx: PlayContext) {
    Actions.dealDamageToField(ctx.field(), Snipe.damage);
  }
}
