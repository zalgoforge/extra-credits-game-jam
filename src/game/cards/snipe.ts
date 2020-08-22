import { Card, PlayContext } from '../card';
import { Actions } from '../actions';
import { UniqueObject } from '../unique-object';
import { Target } from '../target';

export class Snipe extends Card {
  constructor() {
    super();
    this.title = 'Snipe';
    this.description = 'Deal 2 dmg to enemy in field';
  }

  protected getPossibleTargets(): Array<UniqueObject> {
    return Target.anyField();
  }

  play(ctx: PlayContext) {
    // TODO implement effect
    console.log(`Playing Snipe on ${ctx.targets[0].uuid}`);
  }
}
