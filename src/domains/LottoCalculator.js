import LOTTO_STATISTICS from '../constants/lotto-statistics.js';
import LOTTO_RULES from '../constants/lotto-rules.js';
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

  getMatchedNumbersLength(winningNumbers, generatedLotto) {
    return winningNumbers.filter((winningNumber) =>
      generatedLotto.includes(winningNumber),
    ).length;
  }

  isEqualBonusNumber(bonusNumber, generatedLotto) {
    return generatedLotto.includes(bonusNumber);
  }

  #increaseMatchedNumber(number) {
    Object.keys(LOTTO_STATISTICS).forEach((key) => {
      if (LOTTO_STATISTICS[key].number === number) {
        this.#lottoStatics[key]++;
      }
    });
  }

  #increaseMatchedFiveOrBonusNumber(bonusNumber, generatedLotto) {
    if (this.isEqualBonusNumber(bonusNumber, generatedLotto)) {
      this.#lottoStatics.fiveBonus++;
      return;
    }
    this.#lottoStatics.five++;
  }

  #calculateLottoStatics(lottoNumbers, generatedLotto) {
    const { winningNumbers, bonusNumber } = lottoNumbers;
    const count = this.getMatchedNumbersLength(winningNumbers, generatedLotto);

    if (count === LOTTO_RULES.bonusMatchCount) {
      this.#increaseMatchedFiveOrBonusNumber(bonusNumber, generatedLotto);
      return;
    }
    this.#increaseMatchedNumber(count);
  }

  #calculateAllLottoStatics(lottoNumbers, generatedLottos) {
    for (let i = 0; i < generatedLottos.length; i++) {
      this.#calculateLottoStatics(lottoNumbers, generatedLottos[i]);
    }
  }

  #calculateTotalPrice() {
    const totalPrice = Object.keys(LOTTO_STATISTICS).reduce(
      (acc, key) => acc + LOTTO_STATISTICS[key].price * this.#lottoStatics[key],
      0,
    );
    return totalPrice;
  }

  calculateTotalProfit(lottoTickets) {
    const totalPrice = this.#calculateTotalPrice();
    const totalProfit =
      (totalPrice / (lottoTickets * LOTTO_RULES.lottoBaseTicketPrice)) * 0.01;
    return (
      Math.round(totalProfit * LOTTO_RULES.roundingStandard) /
      LOTTO_RULES.roundingStandard
    );
  }

  get lottoStatics() {
    return this.#lottoStatics;
  }
}

export default LottoCalculator;
