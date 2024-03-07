import Observer from "./Observer.js";

import CustomError from "../../step1-console/utils/CustomError.js";

export default class Observable {
  #observers = [];

  constructor() {}

  addObserver(observer) {
    if (observer instanceof Observer === false) {
      throw new CustomError("Observer 인스턴스만 옵저버로 추가할 수 있습니다.");
    }

    this.#observers = [...this.#observers, observer];
  }

  notify() {
    this.#observers.forEach((observer) => observer.update());
  }
}
