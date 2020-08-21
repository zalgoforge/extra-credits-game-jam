import {Signal} from "signal-slot";

export class SignalizingVariable {
    private _value = 0;

    OnValueChanged: Signal<number, number> = new Signal();

    constructor(value = 0) {
        this._value = value;
    }

    add(value: number) {
        let old = this._value;
        this._value += value;
        this.OnValueChanged.emit(this._value, old);
        return this;
    }

    substract(value: number) {
        return this.add(-value);
    }

    value() {
        return this._value;
    }
}