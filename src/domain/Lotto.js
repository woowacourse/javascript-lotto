import { getIntersectionLengthOf } from "../utils";
import { PLACE } from "./constants";

export class Lotto {
  #numbers = [];

  constructor(numbers) {
    this.#numbers = numbers;
  }

  getPlace(winningLotto) {
    switch (getIntersectionLengthOf(this.#numbers, winningLotto.winningNumbers)) {
      case 6:
        return PLACE.first;
      case 5:
        return this.has(winningLotto.bonusNumber) ? PLACE.second : PLACE.third;
      case 4:
        return PLACE.fourth;
      case 3:
        return PLACE.fifth;
      default:
        return PLACE.last;
    }
  }

  get numbers() {
    return this.#numbers;
  }

  has(number) {
    return this.#numbers.includes(number);
  }
}
