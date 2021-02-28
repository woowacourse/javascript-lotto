export default class State {
  #state;

  constructor(state) {
    this.#state = state;
    this.handlers = new Set();
  }

  get() {
    return { ...this.#state };
  }

  setState(newState) {
    this.state = Object.assign({}, this.state, newState);
    this.notify();
  }

  notify() {
    this.handlers.forEach(handler => handler());
  }
}
