import { Signal } from 'signal-slot';

export class Stat {
  private _value = 0;
  private _min = 0;
  private _max = 0;

  onValueChanged = new Signal<number>();

  constructor(value:number) {
    this.setMax(value);
  }

  setMax(value: number) {
    this._value = value;
    this._max = value;
    this.onValueChanged.emit(this._value);
  }

  set(value: number) {
    if (value > this._max) value = this._max;
    if (value < this._min) value = this._min;
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

  max() {
    return this._max;
  }
}
