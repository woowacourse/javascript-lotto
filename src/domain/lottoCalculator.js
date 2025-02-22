import { RANK_INFO_TABLE } from "../constant/rank.js";

class LottoCalculator {
  #winningNumbers;
  #bonusNumber;
  #prize;
  #totalPrice;
  #profit;

  constructor(winningNumbers, bonusNumber) {
    this.#winningNumbers = winningNumbers;
    this.#bonusNumber = bonusNumber;
    this.#prize = [
      { rank: 1, lottos: [] },
      { rank: 2, lottos: [] },
      { rank: 3, lottos: [] },
      { rank: 4, lottos: [] },
      { rank: 5, lottos: [] },
    ];
  }

  calculatePrize(lotto) {
    const matchCount = lotto.countNumbersMatch(this.#winningNumbers);
    const isMatchBonus = lotto.isMatch(this.#bonusNumber);

    const rank = this.calculateRank(matchCount, isMatchBonus);

    if (rank > 0) {
      this.#prize[rank - 1].lottos.push(lotto);
    }
  }

  calculateRank(matchCount, isMatchBonus) {
    if (matchCount === 6) return 1;
    if (matchCount === 5 && isMatchBonus) return 2;
    if (matchCount === 5) return 3;
    if (matchCount === 4) return 4;
    if (matchCount === 3) return 5;
    return 0;
  }

  calculateTotalPrice() {
    this.#totalPrice = this.#prize.reduce((sum, prize) => {
      const info = RANK_INFO_TABLE[prize.rank];
      return sum + info.price * prize.lottos.length;
    }, 0);
  }

  calculateProfit(purchaseMoney) {
    this.#profit = (this.#totalPrice / purchaseMoney) * 100;
  }

  get prize() {
    return this.#prize;
  }

  get totalPrice() {
    return this.#totalPrice;
  }

  get profit() {
    return this.#profit;
  }
}

export default LottoCalculator;
