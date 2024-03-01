import Observable from "./Observable.js";

import { isObject } from "../utils/typeChecker.js";
import { deepCopy } from "../utils/deepCopy.js";

export default class MyState extends Observable {
  #state;
  _initialState;

  constructor(initialState) {
    super();

    this.#state = initialState;
    this._initialState = initialState;
  }

  getState() {
    return this.#state;
  }

  setState(state) {
    this.#assignState(state);

    this.notify();
  }

  reset() {
    const initialState = this.#generateInitialState();

    this.setState(initialState);
  }

  #assignState(state) {
    if (isObject(state)) {
      this.#state = {
        ...this.#state,
        ...state,
      };
    } else {
      this.#state = state;
    }
  }

  #generateInitialState() {
    const isReferenceType =
      isObject(this._initialState) || Array.isArray(this._initialState);

    const initialState = isReferenceType
      ? deepCopy(this._initialState)
      : this._initialState;

    return initialState;
  }
}
