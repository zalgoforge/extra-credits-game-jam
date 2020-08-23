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
    return Target.firstFields(2).filter( field => !field.entity() );
  }

  play(ctx: PlayContext) {
    Actions.placeCardOnField(this, ctx.field());
  }

  entityMovedInto(entity:Entity) {
    Actions.dealDamage(entity, new Damage(this.damage));
    Actions.discardCardFromField(this);
  }

}

export class Strategize extends Card {
  static manaGain = 3;

  constructor() {
    super();
    this.id = "strategize";
    this.title = 'Strategize';
    this.description = `Draw card`;
    this.manaGain = 2;
    this.cost = 0;
  }

  play(ctx: PlayContext) {
    Actions.drawCard();
  }
}

class DrawAfterDiscard extends Card {
  usedThisTurn = false;

  constructor() {
    super();
    this.id = "DrawAfterDiscard";
  }

  onAddedAsPassive() {
    Actions.player().onDiscardedCard.do((data: Card) => {
      if (this.usedThisTurn) return;
      Actions.drawCard();
      this.usedThisTurn = true;
    }).bind();
  }

  endOfTurn() {
    super.endOfTurn();
    this.usedThisTurn = false;
  }
}

export class Rations extends Card {
  constructor() {
    super();
    this.id = "rations";
    this.cost = 4;
    this.title = 'Rations';
    this.description = `Gain "After first discard each turn, draw a card"`;
  }

  play(ctx: PlayContext) {
    Actions.removeCardFromGame(this);
    Actions.addPassive(new DrawAfterDiscard);
  }
}


export function CreateSet() {
  return [
    new BearTrap,
    new BearTrap,

    new Strategize,
    new Strategize,

    new Rations,
   ];
}
