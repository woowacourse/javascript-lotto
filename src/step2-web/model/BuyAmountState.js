import Observable from "../abstract/Observable.js";

export default class BuyAmountState extends Observable {
  #buyAmount = null;

  getState() {
    return this.#buyAmount;
  }

  setState(buyAmount) {
    this.#buyAmount = buyAmount;

    this.notify();
  }

  reset() {
    this.setState(null);
  }
}
