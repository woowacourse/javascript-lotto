class RandomUniquePositiveIntegersPicker {
  #MAX_UPPER = 100000;
  #MIN_UPPER = 1;

  #upper;
  #maxCount;
  #isUsedBooleans;

  constructor(upper) {
    if (typeof upper !== "number")
      throw new Error("[ERROR] 숫자가 아닌 값이 들어옴");
    if (this.#MAX_UPPER < upper)
      throw new Error(`[ERROR] ${this.#MAX_UPPER}보다 작은 값이 들어와야 함`);
    if (upper < this.#MIN_UPPER)
      throw new Error(`[ERROR] ${this.#MIN_UPPER}보다 큰 값이 들어와야 함`);
    this.#upper = upper;
    this.#maxCount = Math.floor(this.#upper / 2);

    this.#isUsedBooleans = new Array(1 + upper).fill(false);
  }

  getRandomUniquePositiveIntegers(count) {
    // count가 너무 많아지면 중복의 경우가 너무 많아져,
    // 중복된 무작위 값이 너무 많이 나오게 되므로, 시간이 너무 오래 걸림
    // count가 Number나 BigInt, 숫자로 변형가능한 타입의 값이 아니라면
    // false가 나오므로 예외 처리됨

    // 이 클래스는 빠른 연산을 목적으로 만들어진 클래스 이므로
    // 유효성 검사를 최대한 적은 시간안에 수행하도록 만들고자 해당 방식을 사용함
    if (!(this.#maxCount > count))
      throw new Error(
        `[ERROR] count는 최대 값의 절반 이하(${maxCount})인 Number형이여야 함`
      );

    const randomNumbers = this.#getRandomNumbers(count);

    randomNumbers.forEach((number) => (this.#isUsedBooleans[number] = false));

    return randomNumbers;
  }

  #getRandomNumbers(count) {
    const randomNumbers = new Array(count);

    let nowIndex = 0;
    while (nowIndex < count) {
      const nowNumber = this.#getRandomNumber();
      if (this.#isUsedBooleans[nowNumber]) continue;
      this.#isUsedBooleans[nowNumber] = true;
      randomNumbers[nowIndex++] = nowNumber;
    }
    return randomNumbers;
  }

  #getRandomNumber() {
    return 1 + Math.floor(Math.random() * this.#upper);
  }
}

export default RandomUniquePositiveIntegersPicker;
