import Observable from "../abstract/Observable.js";

export default class IsResultModalOnState extends Observable {
  #isResultModalOn = false;

  getState() {
    return this.#isResultModalOn;
  }

  setState(isResultModalOn) {
    this.#isResultModalOn = isResultModalOn;

    this.notify();
  }

  reset() {
    this.setState(false);
  }
}
