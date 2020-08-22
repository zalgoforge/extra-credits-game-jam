import { UniqueObject } from './unique-object';

export class PlayContext {
  targets = Array<UniqueObject>();
}

export class Card extends UniqueObject {
  cost: number = 0;
  manaGain = 1;
  title = "Dummy text";
  description = "Lorem ipsum";

  constructor()
  {
    super();
  }

  getContext() {
    let ctx = new PlayContext();
    ctx.targets = this.getPossibleTargets();
    return ctx;
  }

  protected getPossibleTargets() : Array<UniqueObject> {
    return [];
  }

  play() {

  }
}
