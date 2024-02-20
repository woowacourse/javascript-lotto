import Lotto from "./Lotto";

export default class LottoMachine {
  makeLottoByMoney(money) {
    const CNT = Math.floor(money / 1000);
    const returnValues = Array.from(
      { length: CNT },
      () => new Lotto(this.#makeRandomNumbers())
    );
    return returnValues;
  }

  #makeRandomNumbers() {
    const returnValues = [];
    for (let i = 0; i < 6; i += 1) {
      const randomNumber = this.#makeRandomNumber(returnValues);
      returnValues.push(randomNumber);
    }
    return returnValues;
  }

  #makeRandomNumber(numbers) {
    const randomNum = Math.floor(Math.random() * 45);
    if (numbers.includes(randomNum)) {
      return this.#makeRandomNumber;
    }
    return this.#makeRandomNumber;
  }
}
