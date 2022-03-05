import { calculateProfitRate } from "../utils/general.js";
import { LOTTO_NUMBER, LOTTO_RANKING_REWARD } from "../utils/constants.js";

export default class LottoResultModel {
  #lottoResult = {
    first: 0,
    second: 0,
    third: 0,
    fourth: 0,
    fifth: 0,
  };

  getlottoResult() {
    return this.#lottoResult;
  }

  compareWinningNumbers(lotto, winningNumbers) {
    const exceptBonusNumbers = winningNumbers.slice(
      LOTTO_NUMBER.LENGTH_MIN,
      LOTTO_NUMBER.LENGTH_MAX,
    );
    const matchNumberCount = lotto.filter((number) => exceptBonusNumbers.includes(number)).length;
    const isMatchBonus = lotto.includes(winningNumbers[winningNumbers.length - 1]);
    if (matchNumberCount === 6) {
      this.#lottoResult.first += 1;
      return;
    }
    if (matchNumberCount === 5 && isMatchBonus) {
      this.#lottoResult.second += 1;
      return;
    }
    if (matchNumberCount === 5) {
      this.#lottoResult.third += 1;
      return;
    }
    if (matchNumberCount === 4) {
      this.#lottoResult.fourth += 1;
      return;
    }
    if (matchNumberCount === 3) {
      this.#lottoResult.fifth += 1;
    }
  }

  calculateTotalProfitRate(lottoResult, usedAmount) {
    const totalProfit = Object.keys(lottoResult).reduce(
      (total, ranking) => total + lottoResult[ranking] * LOTTO_RANKING_REWARD[ranking],
      0,
    );
    return calculateProfitRate(totalProfit, usedAmount);
  }

  resetLottoResult() {
    this.#lottoResult = {
      first: 0,
      second: 0,
      third: 0,
      fourth: 0,
      fifth: 0,
    };
  }
}
