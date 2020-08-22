import { Enemy } from './enemy';

export class FastEnemy extends Enemy {
  constructor() {
    super();
    this.name = "FastEnemy";
    this.speed = 2;
  }
}
