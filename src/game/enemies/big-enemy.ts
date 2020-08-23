import { Enemy } from './enemy';

export class BigEnemy extends Enemy {
  constructor() {
    super();
    this.name = "BigEnemy";
    this.hp.setMax(12);
  }
}
