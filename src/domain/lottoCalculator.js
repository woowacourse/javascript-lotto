import { RANK_INFO_TABLE } from "../constant/rank.js";

class LottoCalculator {
  #winningNumbers;
  #bonusNumber;

  constructor(winningNumbers, bonusNumber) {
    this.#winningNumbers = winningNumbers;
    this.#bonusNumber = bonusNumber;
  }

  calculatePrize(lottos) {
    return lottos.reduce(
      (result, lotto) => {
        const matchCount = lotto.countNumbersMatch(this.#winningNumbers);
        const isMatchBonus = lotto.isMatch(this.#bonusNumber);
        const rank = this.calculateRank(matchCount, isMatchBonus);

        if (rank > 0) {
          result[rank - 1].lottos.push(lotto);
        }
        return result;
      },
      [
        { rank: 1, lottos: [] },
        { rank: 2, lottos: [] },
        { rank: 3, lottos: [] },
        { rank: 4, lottos: [] },
        { rank: 5, lottos: [] },
      ]
    );
  }

  calculateRank(matchCount, isMatchBonus) {
    if (matchCount === 6) return 1;
    if (matchCount === 5 && isMatchBonus) return 2;
    if (matchCount === 5) return 3;
    if (matchCount === 4) return 4;
    if (matchCount === 3) return 5;
    return 0;
  }

  calculateTotalPrice(prize) {
    return prize.reduce((sum, prizeGroup) => {
      const info = RANK_INFO_TABLE[prizeGroup.rank];
      return sum + info.price * prizeGroup.lottos.length;
    }, 0);
  }

  calculateProfit(totalPrice, purchaseMoney) {
    return (totalPrice / purchaseMoney) * 100;
  }
}

export default LottoCalculator;
