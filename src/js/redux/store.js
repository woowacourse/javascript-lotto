export default class Store {
  static singletonStore = null;

  constructor() {
    if (Store.singletonStore) return Store.singletonStore;
    this.subscribers = [];
    this.states = {};
    Store.singletonStore = this;
  }

  setup(states = {}, reduce) {
    this.states = states;
    this.reduce = reduce ?? function () {};
    this.states = this.reduce(this.states, {});
    this.prevStates = this.states;
  }

  getStates() {
    return this.states;
  }

  getPrevStates() {
    return this.prevStates;
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
