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
    let lane = ctx.lane();
    let target = lane.firstNonEmptyField();
    if (!target) {
      console.log(`Nobody to hit`);
      return;
    }
    let entity = target.entity()
    if (!entity) return;
    Actions.moveBackward(entity);
  }
}
