import { Enemy } from './enemy';

export class TestEnemy extends Enemy {
  constructor() {
    super();
    this.name = "TestEnemy";
    this.hp.setMax(5);
  }
}