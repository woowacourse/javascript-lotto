import LOTTO_STATICS from '../constants/lotto-statics.js';
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

  compare(winningNumbers, generatedLotto) {
    return winningNumbers.filter((winningNumber) =>
      generatedLotto.includes(winningNumber),
    ).length;
  }
  // 뭐하는건지 더 자세히 메서드 명 쓰기

  isEqualBonusNumber(bonusNumber, generatedLotto) {
    return generatedLotto.includes(bonusNumber);
  }
  // 이거 네이밍 어케하지
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

    if (count === LOTTO_RULES.bonusMatchCount) {
      this.#increaseFiveOrBonus(bonusNumber, generatedLotto);
      return;
    }
    this.#increaseLottoCount(count);
  }

  #calculateAllLottoStatics(lottoNumbers, generatedLottos) {
    for (let i = 0; i < generatedLottos.length; i++) {
      this.#calculateLottoStatics(lottoNumbers, generatedLottos[i]);
    }
  }

  #increaseFiveOrBonus(bonusNumber, generatedLotto) {
    if (this.isEqualBonusNumber(bonusNumber, generatedLotto)) {
      this.#lottoStatics.fiveBonus++;
      return;
    }
    this.#lottoStatics.five++;
  }

  #calculateTotalPrice() {
    const totalPrice = Object.keys(LOTTO_STATICS).reduce(
      (acc, key) => acc + LOTTO_STATICS[key].price * this.#lottoStatics[key],
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
