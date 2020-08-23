import { Card, PlayContext } from '../card';
import { Actions } from '../actions';
import { UniqueObject } from '../unique-object';
import { Target } from '../target';
import { Damage } from '../damage';

export class ThrowRock extends Card {
  static damage = 2;

  constructor() {
    super();
    this.title = 'Throw rock';
    this.description = `Deal ${ThrowRock.damage} dmg to first enemy in lane`;
  }

  protected getPossibleTargets(): Array<UniqueObject> {
    return Target.anyLane();
  }

  play(ctx: PlayContext) {
    let entity = Target.firstEnemyInLane(ctx.lane());
    if (!entity) return;
    Actions.dealDamage(entity, new Damage(ThrowRock.damage));
  }
}
