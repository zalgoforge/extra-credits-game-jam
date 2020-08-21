import { Signal } from 'signal-slot';

export class SignalizingVariable {
  private _value = 0;

  onValueChanged = new Signal<number>();

  constructor(value = 0) {
    this._value = value;
  }

  add(value: number) {
    this._value += value;
    this.onValueChanged.emit(this._value);
    return this;
  }

  substract(value: number) {
    return this.add(-value);
  }

  value() {
    return this._value;
  }
}
