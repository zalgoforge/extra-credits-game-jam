import { Entity, EntityStatusUpdate } from './entity';
import { Damage } from './damage';
import { GameState } from './game';
import { Status } from './status';
import { Field } from './board';
import { Card, PlayContext } from './card';
import { UniqueObject } from './unique-object';

export class Actions {
  static player() {
    return GameState.instance().player;
  }

  static board() {
    return GameState.instance().board;
  }

  static addToHand(card: Card) {
    let player = Actions.player();
    if (player.hand.size() >= player.handLimit.value()) {
      console.log('Cannot add card due to hand limit');
      return false;
    }
    player.hand.add(card);
    return true;
  }

  static drawCard() {
    let player = Actions.player();
    if (player.hand.size() >= player.handLimit.value()) {
      console.log('Cannot draw card due to hand limit');
      return false;
    }

    if (player.deck.empty()) {
      player.deck.addAllCardsFrom(player.discard);
      if (player.deck.empty()) return false;
      Actions.shuffleDeck();
    }

    let card = player.deck.draw();
    Actions.addToHand(card);
    console.log('Drawing card');
    return true;
  }

  static drawToHandSize() {
    console.log('Drawing up to hand size...');
    while (this.drawCard()) {}
    console.log('Drawed up to hand size');
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

    if (Actions.player().hand.remove(card)) {
      if (!card.temporary) Actions.player().discard.add(card);
    }

    let ctx = new PlayContext();
    if (target) {
      ctx.targets.push(target);
    }
    card.play(ctx);
  }

  static placeCardOnField(card: Card, field: Field) {
    // remove card from hand, if user has it in hand (TODO should be remove from current deck)
    Actions.removeCardFromGame(card);
    Actions.board().addCard(card, field);
  }

  static discardCardFromField(card: Card) {
    Actions.board().discardCard(card);
  }

  static discardCard(card: Card) {
    if (Actions.player().hand.remove(card)) {
      if (!card.temporary) Actions.player().discard.add(card);
      Actions.player().onDiscardedCard.emit(card);
      return true;
    } else {
      return false;
    }
  }

  static discardCardForMana(card: Card) {
    if (Actions.discardCard(card)) {
      Actions.player().mana.add(card.manaGain);
    }
  }

  static addPassive(card: Card) {
    GameState.instance().passiveEffects.add(card);
    card.onAddedAsPassive();
  }

  static removeCardFromGame(card: Card) {
    // should remove from any deck
    Actions.player().hand.remove(card);
    Actions.player().discard.remove(card);
  }

  static loseAllMana() {
    Actions.player().mana.set(0);
  }

  static gainMana(amount = 1) {
    Actions.player().mana.add(amount);
  }

  static heal(entity: Entity, amount = 1) {
    entity.hp.add(amount);
    Entity.onEntityHPChanged.emit(entity);
  }

  static addMaxHealth(entity: Entity, amount = 1) {
    entity.hp.addMax(amount);
    Entity.onEntityHPChanged.emit(entity);
  }

  static healPlayer(amount = 1) {
    Actions.heal(Actions.player().entity, amount);
  }

  static dealDamageToPlayer(amount = 1) {
    let dmg = new Damage(amount);
    Actions.dealDamage(Actions.player().entity, dmg);
  }

  static dealDamageToFields(fields: Field[], amount = 1) {
    for(let field of fields) {
      Actions.dealDamageToField(field, amount);
    }
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
    if (target.hp.value() <= 0) {
      Actions.killEntity(target);
    }
  }

  static spawnEnemy(entity: Entity, field: Field) {
    return Actions.board().addEntity(entity, field);
  }

  static killEntity(entity: Entity) {
    return Actions.board().destroyEntity(entity);
  }

  static addStatus(entity: Entity, status: Status, amount: number = 1) {
    entity.statuses.add(status, amount);
    let data = new EntityStatusUpdate(entity, status, amount);
    Entity.onEntityStatusChanged.emit(data);
  }

  static substractStatus(entity: Entity, status: Status, amount: number = 1) {
    entity.statuses.substract(status, amount);
    let data = new EntityStatusUpdate(entity, status, -amount);
    Entity.onEntityStatusChanged.emit(data);
  }

  static moveForward(entity: Entity) {
    let field = entity.field()?.nextField();
    if (!field) return;
    return Actions.board().moveEntity(entity, field);
  }

  static moveBackward(entity: Entity) {
    let field = entity.field()?.previousField();
    if (!field) return;
    return Actions.board().moveEntity(entity, field);
  }

}
