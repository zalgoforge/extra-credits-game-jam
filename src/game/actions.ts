import { Entity } from './entity';
import { Damage } from './damage';
import { GameState } from './game';
import { Field } from './board';
import { Card, PlayContext } from './card';
import { UniqueObject } from './unique-object';

export class Actions {
  private static player() {
    return GameState.instance().player;
  }

  private static board() {
    return GameState.instance().board;
  }

  static drawCard() {
    //TODO shuffle discard
    let player = Actions.player();
    if (player.hand.size() >= player.handLimit.value()) {
      console.log('Cannot draw card due to hand limit');
      return false;
    }
    let card = player.deck.draw();
    player.hand.add(card);
    console.log('Drawing card');
    return true;
  }

  static shuffleDeck() {
    Actions.player().deck.shuffle();
  }

  static playCard(card: Card, target: UniqueObject) {
    let checkCtx = card.getContext();
    if (!checkCtx.validTarget(target)) {
      console.log(`${target.uuid} is invalid target for ${card.title}`);
      return;
    }

    if (!Actions.player().mana.tryToPay(card.cost)) {
      console.log(`Cannot pay cost to play ${card.title}`);
      return;
    }

    console.log(`Playing ${card.title}`);
    // remove card from hand, if user has it in hand
    Actions.player().hand.remove(card);
    let ctx = new PlayContext();
    if (target) {
      ctx.targets.push(target);
    }
    card.play(ctx);
  }

  static discardCard(card: Card) {
    if (Actions.player().hand.remove(card)) {
      console.log(`Discarded ${card.title}`);
    } else {
      console.log(`Failed to discard ${card.title}`);
    }
  }

  static discardCardForMana(card: Card) {
    if (Actions.player().hand.remove(card)) {
      let manaGain = card.manaGain;
      Actions.player().mana.add(manaGain);
      console.log(`Discarded ${card.title} for ${manaGain} mana`);
    } else {
      console.log(`Failed to discard ${card.title}`);
    }
  }

  static drawToHandSize() {
    console.log('Drawing up to hand size...');
    while (this.drawCard()) {}
    console.log('Drawed up to hand size');
  }

  static gainMana(amount = 1) {
    Actions.player().mana.add(amount);
  }

  static dealDamageToPlayer(amount = 1) {
    let dmg = new Damage(amount);
    Actions.dealDamage(Actions.player().entity, dmg);
  }

  static dealDamageToField(field: Field, amount = 1) {
    let entity = field.entity();
    if (!entity) return;
    let dmg = new Damage(amount);
    Actions.dealDamage(entity, dmg);
  }

  static dealDamage(target: Entity, damage: Damage) {
    console.log(`Dealing ${damage.amount} dmg to ${target.name}`);
    target.takeDamage(damage);
  }

  static spawnEnemy(entity: Entity, field: Field) {
    return Actions.board().addEntity(entity, field);
  }

  static killEntity(entity: Entity) {
    return Actions.board().destroyEntity(entity);
  }

  static moveForward(entity: Entity) {
    let field = entity.field();
    if (!field) return;
    field = field.nextField();
    if (!field) return;
    return Actions.board().moveEntity(entity, field);
  }

}
