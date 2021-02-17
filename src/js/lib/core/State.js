export default class State {
  _value;

  constructor(initialValue = null) {
    this._value = initialValue;
  }

  get() {
    return this._value;
  }

  set(newValue) {
    this._value = newValue;
  }
}
