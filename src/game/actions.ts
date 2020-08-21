import { Entity } from './entity';
import { Damage } from './damage';
import { GameState } from './game';
import { Card } from './card';

export class Actions {
  private static player() {
    return GameState.instance().player;
  }

  static drawCard() {
    let player = Actions.player();
    if (player.hand.size() >= player.handLimit.value()) {
      console.log("Cannot draw card due to hand limit");
      return false;
    }
    let card = player.deck.draw();
    player.hand.add(card);
    console.log("Drawing card");
    return true;
  }

  static shuffleDeck() {
    Actions.player().deck.shuffle();
  }

  static discardCard(card:Card) {
    if(Actions.player().hand.remove(card)) {
      console.log(`Discarded ${card.title}`);
    } else {
      console.log(`Failed to discard ${card.title}`);
    }
  }

  static drawToHandSize() {
    console.log("Drawing up to hand size...");
    while (this.drawCard()) {}
    console.log("Drawed up to hand size");
  }

  static gainMana(amount=1) {
    Actions.player().mana.add(1);
  }

  static dealDamage(target: Entity, damage: Damage) {

  }
}
