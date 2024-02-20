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
    const lottoSet = new Set();

    while (lottoSet.size !== 6) {
      lottoSet.add(Math.ceil(Math.random() * 45));
    }

    return [...lottoSet];
  }
}
