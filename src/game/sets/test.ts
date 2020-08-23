import { Card, PlayContext } from '../card';
import { Actions } from '../actions';
import { UniqueObject } from '../unique-object';
import { Target } from '../target';
import { Damage } from '../damage';
import { Entity } from '../entity';

export class BearTrap extends Card {
  damage = 5;

  constructor() {
    super();
    this.id = "bear-trap";
    this.cost = 2;
    this.title = 'Bear Trap';
    this.description = `Deal ${this.damage} dmg to first enemy that steps into it`;
  }

  protected getPossibleTargets(): Array<UniqueObject> {
    return Target.anyFieldWithoutEnemy();
  }

  play(ctx: PlayContext) {
    Actions.placeCardOnField(this, ctx.field());
  }

  entityMovedInto(entity:Entity) {
    Actions.dealDamage(entity, new Damage(this.damage));
    Actions.discardCardFromField(this);
  }

}



export function CreateSet() {
  return [
    new BearTrap,
    new BearTrap,
    new BearTrap,
    new BearTrap,
    new BearTrap,
    new BearTrap,
   ];
}
