export default class Random {
  static pickNumbersBetween(minInclusive, maxInclusive, count) {
    this.#validateRange(minInclusive, maxInclusive);
    this.#validateCount(minInclusive, maxInclusive, count);

    const numbers = this.#getNumbersInRange(minInclusive, maxInclusive);

    const shuffledNumbers = this.#shuffle(numbers);

    return shuffledNumbers.slice(0, count);
  }

  static #validateRange(min, max) {
    if (min > max) {
      throw new Error("[ERROR] 최소값은 최대값보다 작거나 같아야 합니다.");
    }
  }

  static #validateCount(min, max, count) {
    if (count > max - min + 1) {
      throw new Error(
        "[ERROR] 최대값과 최소값의 차이보다 큰 수를 뽑을 수 없습니다."
      );
    }
  }

  static #getNumbersInRange(min, max) {
    return Array(max - min + 1)
      .fill()
      .map((_, index) => index + min);
  }

  static #shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }
}
