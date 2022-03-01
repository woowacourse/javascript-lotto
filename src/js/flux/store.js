import reducer from './reducer';

class Store {
  #subscribers = [];

  #state = {};

  constructor(initialState) {
    this.#state = initialState;
  }

  subscribe(component) {
    this.#subscribers.push(component);
  }

  dispatch(action) {
    const newState = reducer(this.getState(), action);
    this.#setState(newState);
    this.#subscribers.forEach((subscriber) => {
      subscriber.notify();
    });
  }

  getState() {
    return this.#state;
  }

  #setState(newState) {
    this.#state = newState;
  }
}

export default Store;
