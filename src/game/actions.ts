import { Entity } from './entity';
import { Damage } from './damage';
import { GameState } from './game';
import { Status } from './status';
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

    if (player.deck.empty()) {
      player.deck.addAllCardsFrom(player.discard);
      if (player.deck.empty()) return false;
      Actions.shuffleDeck();
    }

    let card = player.deck.draw();
    player.hand.add(card);
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

    let ctx = new PlayContext();
    if (target) {
      ctx.targets.push(target);
    }
    card.play(ctx);

    // TODO should be remove from current deck, if deck doesn't changed from before
    if (Actions.player().hand.remove(card)) {
      Actions.player().discard.add(card);
    }
  }

  static placeCardOnField(card: Card, field: Field) {
    // remove card from hand, if user has it in hand (TODO should be remove from current deck)
    Actions.player().hand.remove(card);
    Actions.board().addCard(card, field);
  }

  static discardCardFromField(card: Card) {
    Actions.board().discardCard(card);
  }


  static discardCard(card: Card) {
    if (Actions.player().hand.remove(card)) {
      Actions.player().discard.add(card);
      console.log(`Discarded ${card.title}`);
    } else {
      console.log(`Failed to discard ${card.title}`);
    }
  }

  static discardCardForMana(card: Card) {
    if (Actions.player().hand.remove(card)) {
      Actions.player().discard.add(card);
      let manaGain = card.manaGain;
      Actions.player().mana.add(manaGain);
      console.log(`Discarded ${card.title} for ${manaGain} mana`);
    } else {
      console.log(`Failed to discard ${card.title}`);
    }
  }

  static loseAllMana() {
    Actions.player().mana.set(0);
  }

  static gainMana(amount = 1) {
    Actions.player().mana.add(amount);
  }

  static healPlayer(amount = 1) {
    Actions.player().entity.heal(amount);
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

  static addStatusOnEntity(entity: Entity, status: Status, amount: number = 1) {
    entity.statuses.add(status, amount);
    Entity.onEntityStatusChanged.emit(entity);
  }

  static substractStatusOnEntity(entity: Entity, status: Status, amount: number = 1) {
    entity.statuses.substract(status, amount);
    Entity.onEntityStatusChanged.emit(entity);
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
