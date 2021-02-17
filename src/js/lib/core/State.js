export default class State {
  _value;
  handlers;

  constructor(initialValue = null) {
    this._value = initialValue;
    this.handlers = new Set();
  }

  get() {
    return this._value;
  }

  set(newValue) {
    this._value = newValue;
    this.notify();
  }

  subscribe(handler) {
    if (typeof handler === 'function') {
      this.handlers.add(handler);
    }
  }

  notify() {
    this.handlers.forEach(handler => handler());
  }
}
