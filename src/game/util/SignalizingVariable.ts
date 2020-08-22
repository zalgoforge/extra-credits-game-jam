import { Signal } from 'signal-slot';

export class SignalizingVariable {
  private _value = 0;

  onValueChanged = new Signal<number>();

  constructor(value = 0) {
    this._value = value;
  }

  set(value: number) {
    if (value == this._value) return this;
    this._value = value;
    this.onValueChanged.emit(this._value);
    return this;
  }

  add(value: number) {
    return this.set(this._value + value);
  }

  substract(value: number) {
    return this.set(this._value - value);
  }

  tryToPay(amount: number) {
    if (amount > this._value) return false;
    this.substract(amount);
    return true;
  }

  value() {
    return this._value;
  }
}
