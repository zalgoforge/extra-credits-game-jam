import { Card } from '../card';
import { Actions } from '../actions';

export class HurtSelf extends Card {
  constructor() {
    super();
    this.title = "Hurt Self";
    this.description = "Take 1 dmg";
  }

  play() {
    Actions.dealDamageToPlayer();
  }
}
