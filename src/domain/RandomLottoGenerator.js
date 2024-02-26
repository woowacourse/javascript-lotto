import NUMBERS from "./constants/numbers";

class RandomLottoGenerator {
  static #upper = NUMBERS.maxLottoNumber;

  static #isUsedBooleans = new Array(1 + this.#upper).fill(false);

  static getRandomLotto() {
    const lotto = this.#getUnusedPositives();

    lotto.forEach((number) => {
      this.#isUsedBooleans[number] = false;
    });

    return lotto;
  }

  static #getUnusedPositives() {
    const unusedPositives = new Array(NUMBERS.lottoNumbersLength);
    this.#setRandomNumber(unusedPositives);

    return unusedPositives;
  }

  static #setRandomNumber(array) {
    let nowIndex = 0;
    while (nowIndex < NUMBERS.lottoNumbersLength) {
      const nowNumber = this.#getUnusedRandomNumber();
      this.#isUsedBooleans[nowNumber] = true;
      array[nowIndex] = nowNumber;
      nowIndex += 1;
    }
  }

  static #getUnusedRandomNumber() {
    let randomNumber = this.#getRandomNumber();
    while (this.#isUsedBooleans[randomNumber]) {
      randomNumber = this.#getRandomNumber();
    }
    return randomNumber;
  }

  static #getRandomNumber() {
    return 1 + Math.floor(Math.random() * NUMBERS.maxLottoNumber);
  }
}

export default RandomLottoGenerator;
