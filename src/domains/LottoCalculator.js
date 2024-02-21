import { LOTTO_STATICS } from '../constant/lotto-statics.js';
class LottoCalculator {
  #lottoStatics;

  constructor(lottoNumbers, generatedLottos) {
    this.#lottoStatics = {
      three: 0,
      four: 0,
      five: 0,
      fiveBonus: 0,
      six: 0,
    };
    this.#calculateAllLottoStatics(lottoNumbers, generatedLottos);
  }

  compare(winningNumbers, generatedLotto) {
    return winningNumbers.filter((winningNumber) =>
      generatedLotto.includes(winningNumber),
    ).length;
  }

  isEqualBonusNumber(bonusNumber, generatedLotto) {
    return generatedLotto.includes(bonusNumber);
  }

  #increaseLottoCount(number) {
    Object.keys(LOTTO_STATICS).forEach((key) => {
      if (LOTTO_STATICS[key].number === number) {
        this.#lottoStatics[key]++;
      }
    });
  }

  #calculateLottoStatics(lottoNumbers, generatedLotto) {
    const { winningNumbers, bonusNumber } = lottoNumbers;
    const count = this.compare(winningNumbers, generatedLotto);

    if (count === 5) {
      this.#increaseFiveOrBonus(bonusNumber, generatedLotto);
      return;
    }
    this.#increaseLottoCount(count);
  }

  #calculateAllLottoStatics(lottoNumbers, generatedLottos) {
    for (let i = 0; i < generatedLottos[0].length; i++) {
      this.#calculateLottoStatics(lottoNumbers, generatedLottos[i]);
    }
  }

  #increaseFiveOrBonus(bonusNumber, generatedLottos) {
    if (this.isEqualBonusNumber(bonusNumber, generatedLottos)) {
      this.#lottoStatics.fiveBonus++;
      return;
    }
    this.#lottoStatics.five++;
  }

  calculateTotalProfit(lottoTickets) {
    const totalPrice = Object.keys(LOTTO_STATICS).reduce(
      (acc, key) => acc + LOTTO_STATICS[key].price * this.#lottoStatics[key],
      0,
    );

    const totalProfit = (totalPrice / (lottoTickets * 1000)) * 0.01;
    return Math.round(totalProfit * 100) / 100;
  }

  get lottoStatics() {
    return this.#lottoStatics;
  }
}

export default LottoCalculator;
