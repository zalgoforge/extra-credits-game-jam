import { Entity } from './entity';
import { GameState } from './game';

export class Actions {
  private static player() {
    return GameState.instance().player;
  }

  static drawCard() {
    let card = Actions.player().deck.draw();
    Actions.player().hand.add(card);
  }

  static gainMana() {}

  static dealDamage(target: Entity) {}
}
