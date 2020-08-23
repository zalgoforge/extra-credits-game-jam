import { Card, PlayContext } from '../card';
import { Actions } from '../actions';
import { UniqueObject } from '../unique-object';
import { Target } from '../target';

export class PushBack extends Card {
  constructor() {
    super();
    this.title = 'Push Back';
    this.description = `Push first enemy in lane back`;
  }

  protected getPossibleTargets(): Array<UniqueObject> {
    return Target.anyLane();
  }

  play(ctx: PlayContext) {
    let entity = Target.firstEnemyInLane(ctx.lane());
    if (!entity) return;
    Actions.moveBackward(entity);
  }
}
