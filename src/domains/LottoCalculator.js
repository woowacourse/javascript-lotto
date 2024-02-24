import LOTTO_STATISTICS from '../constants/lotto-statistics.js';
import LOTTO_RULES from '../constants/lotto-rules.js';
class LottoCalculator {
  #lottoStatistics;

  constructor(lottoNumbers, generatedLottos) {
    this.#lottoStatistics = {
      three: 0,
      four: 0,
      five: 0,
      fiveBonus: 0,
      six: 0,
    };
    this.#calculateAllLottoStatistics(lottoNumbers, generatedLottos);
  }

  countMatchedNumber(winningNumbers, generatedLotto) {
    return winningNumbers.filter((winningNumber) =>
      generatedLotto.includes(winningNumber),
    ).length;
  }

  isEqualBonusNumber(bonusNumber, generatedLotto) {
    return generatedLotto.includes(bonusNumber);
  }

  #increaseLottoCount(number) {
    Object.keys(LOTTO_STATISTICS).forEach((key) => {
      if (LOTTO_STATISTICS[key].number === number) {
        this.#lottoStatistics[key]++;
      }
    });
  }
  // 이거 네이밍 수정하기
  #calculateOneLotto(lottoNumbers, generatedLotto) {
    const { winningNumbers, bonusNumber } = lottoNumbers;
    const count = this.countMatchedNumber(winningNumbers, generatedLotto);

    if (count === LOTTO_RULES.bonusMatchCount) {
      this.#increaseFiveOrBonus(bonusNumber, generatedLotto);
      return;
    }
    this.#increaseLottoCount(count);
  }

  #calculateAllLottoStatistics(lottoNumbers, generatedLottos) {
    for (let i = 0; i < generatedLottos.length; i++) {
      this.#calculateOneLotto(lottoNumbers, generatedLottos[i]);
    }
  }

  #increaseFiveOrBonus(bonusNumber, generatedLotto) {
    if (this.isEqualBonusNumber(bonusNumber, generatedLotto)) {
      this.#lottoStatistics.fiveBonus++;
      return;
    }
    this.#lottoStatistics.five++;
  }

  #calculateTotalPrice() {
    const totalPrice = Object.keys(LOTTO_STATISTICS).reduce(
      (acc, key) =>
        acc + LOTTO_STATISTICS[key].price * this.#lottoStatistics[key],
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

  get lottoStatistics() {
    return this.#lottoStatistics;
  }
}

export default LottoCalculator;
