class RandomUniquePositiveIntegersPicker {
  #MAX_UPPER = 100000;
  #MIN_UPPER = 1;

  #upper;
  #itUsedBooleans;

  constructor(upper) {
    if (typeof upper !== "number")
      throw new Error("[ERROR] 숫자가 아닌 값이 들어옴");
    if (this.#MAX_UPPER < upper)
      throw new Error(`[ERROR] ${this.#MAX_UPPER}보다 작은 값이 들어와야 함`);
    if (upper < this.#MIN_UPPER)
      throw new Error(`[ERROR] ${this.#MAX_UPPER}보다 작은 값이 들어와야 함`);
    this.#upper = upper;

    this.#itUsedBooleans = new Array(1 + upper).fill(false);
  }

  getRandomUniquePositiveIntegers(count) {
    // count가 너무 많아지면 중복의 경우가 너무 많아져,
    // 중복된 무작위 값이 너무 많이 나오게 되므로, 시간이 너무 오래 걸림
    const maxCount = Math.floor(this.#upper / 2);
    if (maxCount / 2 < count)
      throw new Error(
        `[ERROR] count는 최대 값의 절반 이하(${maxCount})여야 함`
      );

    const randomNumbers = this.#getRandomNumbers(count);

    randomNumbers.forEach((number) => (this.#itUsedBooleans[number] = false));

    return randomNumbers;
  }

  #getRandomNumbers(count) {
    const randomNumbers = new Array(count);

    let nowIndex = 0;
    while (nowIndex < count) {
      const nowNumber = this.#getRandomNumber();
      if (this.#itUsedBooleans[nowNumber]) continue;
      this.#itUsedBooleans[nowNumber] = true;
      randomNumbers[nowIndex++] = nowNumber;
    }
    return randomNumbers;
  }

  #getRandomNumber() {
    return 1 + Math.floor(Math.random() * this.#upper);
  }
}

export default RandomUniquePositiveIntegersPicker;
