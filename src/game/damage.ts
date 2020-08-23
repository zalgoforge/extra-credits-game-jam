export enum DamageType {
  Normal,
  PiercingDamage
}

export class Damage {
  amount: number;
  responseDamageDealt: number = 0;
  type: DamageType;

  constructor(amount = 1, type = DamageType.Normal) {
    this.amount = amount;
    this.type = type;
  }
}
