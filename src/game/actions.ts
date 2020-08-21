import { Entity } from './entity';
import { Damage } from './damage';
import { GameState } from './game';

export class Actions {
  private static player() {
    return GameState.instance().player;
  }

  static drawCard() {
    let card = Actions.player().deck.draw();
    Actions.player().hand.add(card);
  }

  static gainMana(amount=1) {
    Actions.player().mana.add(1);
  }

  static dealDamage(target: Entity, damage: Damage) {

  }
}
