import * as reducers from './reducer.js';
export default class Store {
  static singletonStore = null;

  constructor() {
    if (Store.singletonStore) return Store.singletonStore;
    this.subscribers = [];
    this.states = {
      payment: 0,
      lottos: [],
      winningCount: {},
      profit: 0,
    };
    this.states = this.reduce(this.states, {});
    this.prevStates = this.states;
    Store.singletonStore = this;
  }

  getStates() {
    return this.states;
  }

  getPrevStates() {
    return this.prevStates;
  }

  reduce(states, action) {
    return {
      payment: reducers.payment(states.payment, action),
      lottos: reducers.lottos(states.lottos, states.payment, action),
      winningCount: reducers.winningCount(
        states.winningCount,
        states.lottos,
        action,
      ),
      profit: reducers.profit(
        states.profit,
        states.lottos.length,
        states.winningCount,
        action,
      ),
    };
  }

  subscribe(func) {
    this.subscribers.push(func);
  }

  notifySubscribers() {
    this.subscribers.forEach(
      function (subscriber) {
        subscriber(this.prevStates, this.states);
      }.bind(this),
    );
  }

  dispatch(action) {
    this.prevStates = this.states;
    this.states = this.reduce(this.states, action);
    this.notifySubscribers();
  }
}
