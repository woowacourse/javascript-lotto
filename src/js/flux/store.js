/* eslint-disable no-underscore-dangle */
import { INITIAL_STATE } from '../constants';
import reducer from './reducer';

class Store {
  static _instance = null;

  static get instance() {
    if (!Store._instance) {
      Store._instance = new Store({ ...INITIAL_STATE });
    }
    return Store._instance;
  }

  #subscribers = [];

  #state = {};

  constructor(initialState) {
    if (Store._instance) {
      // eslint-disable-next-line no-constructor-return
      return Store._instance;
    }
    this.#state = initialState;
    Store._instance = this;
  }

  getState() {
    return this.#state;
  }

  subscribe(component) {
    this.#subscribers.push(component);
  }

  dispatch(action) {
    this.#state = reducer(this.getState(), action);
    this.#subscribers.forEach((subscriber) => {
      subscriber.notify();
    });
  }
}

export default Store;
