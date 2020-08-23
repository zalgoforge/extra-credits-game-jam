import { Stat } from './util/Stat';

export enum Status {
  Soak,
  Stun,
  Poison
}

export class Statuses {
  _statuses = {
    [Status.Soak]: Stat.CreateEmptyWithMax(1000),
    [Status.Stun]: Stat.CreateEmptyWithMax(1),
    [Status.Poison]: Stat.CreateEmptyWithMax(1000),
  };

  getValue(type: Status) {
    return this.get(type).value();
  }

  private get(type: Status) {
    return this._statuses[type];
  }

  add(type: Status, amount: number) {
    this.get(type).add(amount);
  }

  substract(type: Status, amount: number) {
    this.get(type).substract(amount);
  }
}
