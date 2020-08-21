import { v4 as uuidv4 } from 'uuid';

export class Card {
  cost: number = 0;
  manaGain = 1;
  uuid = uuidv4();
  title = "Dummy text";
  description = "Lorem ipsum";

  //TODO leak
  private static cardIds: { [uuid: string]: Card; } = {};

  constructor()
  {
    Card.cardIds[this.uuid] = this;
  }

  play() {

  }
}
