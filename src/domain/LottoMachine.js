import pickRandomNumberInRange from '../util/pickRandomNumberInRange';

class LottoMachine {
  #purchaseAmount;

  constructor(purchaseAmount) {
    this.#purchaseAmount = purchaseAmount;
  }
  getLottoNumberList() {
    const lottoCount = this.#purchaseAmount / 1000;
    return Array.from({ length: lottoCount }).map((_) => this.#createLottoNumber());
  }

  #createLottoNumber() {
    const lotto = new Set();
    while (lotto.size < 6) {
      lotto.add(pickRandomNumberInRange(1, 45));
    }
    return [...lotto].sort((firstNumber, secondNumber) => firstNumber - secondNumber);
  }
}

export default LottoMachine;
