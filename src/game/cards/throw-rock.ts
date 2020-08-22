import { Card, PlayContext } from '../card';
import { Actions } from '../actions';
import { UniqueObject } from '../unique-object';
import { Target } from '../target';

export class ThrowRock extends Card {
  constructor() {
    super();
    this.title = "Throw rock";
    this.description = "Deal 2 dmg to first enemy in lane";
  }

  protected getPossibleTargets() : Array<UniqueObject> {
    return Target.anyLane();
  }

  play(ctx:PlayContext) {
    // TODO implement effect
    console.log(`Playing TrowRock on ${ctx.targets[0].uuid}`);
  }
}
