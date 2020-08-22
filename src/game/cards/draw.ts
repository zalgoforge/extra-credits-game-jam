import { Card, PlayContext } from '../card';
import { Actions } from '../actions';

export class Draw extends Card {
  constructor() {
    super();
    this.title = "Draw";
    this.description = "Draw a card";
  }

  play(ctx:PlayContext) {
    Actions.drawCard();
  }
}
