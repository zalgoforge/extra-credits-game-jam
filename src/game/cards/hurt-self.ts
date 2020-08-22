import { Card, PlayContext } from '../card';
import { Actions } from '../actions';

export class HurtSelf extends Card {
  static damage = 1;

  constructor() {
    super();
    this.title = 'Hurt Self';
    this.description = `Take ${HurtSelf.damage} dmg`;
  }

  play(ctx: PlayContext) {
    Actions.dealDamageToPlayer(HurtSelf.damage);
  }
}
