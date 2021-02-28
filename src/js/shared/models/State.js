export default class State {
  #state;

  constructor(state) {
    this.#state = state;
    this.handlers = new Set();
  }

  getState() {
    return { ...this.#state };
  }

  setState(newState) {
    this.#state = Object.assign({}, this.#state, newState);
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
