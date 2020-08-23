export class Damage {
  amount: number;
  responseDamageDealt: number = 0;

  constructor(amount = 1) {
    this.amount = amount;
  }
}
