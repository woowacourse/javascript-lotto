import LOTTO_SYSTEM from "../constants/lottoSystem";

class LottoDrawingMachine {
  draw(lottos, winningLotto) {
    const matchedCounts = this.#matchLottoCounts(lottos, winningLotto);

    return this.#checkRankings(matchedCounts);
  }

  calculateTotalProfitRate(rankings) {
    const { lottoPrize, lottoPrice } = LOTTO_SYSTEM;
    const purchaseAmount = lottoPrice * rankings.length;

    const totalProfit = rankings.reduce((acc, ranking) => {
      acc += lottoPrize[ranking];
      return acc;
    }, 0);

    const totalProfitRate = (totalProfit / purchaseAmount) * 100;

    return Number(totalProfitRate.toFixed(1));
  }

  #matchLottoCounts(lottos, winningLotto) {
    return lottos.map((lotto) => ({
      correctCount: winningLotto.compareWinningNumbersWithLotto(lotto.numbers),
      isBonusCorrect: winningLotto.isBonusNumberMatch(lotto.numbers),
    }));
  }

  #checkRankings(matchedCounts) {
    return matchedCounts.map(({ correctCount, isBonusCorrect }) =>
      this.#checkRanking(correctCount, isBonusCorrect),
    );
  }

  #checkRanking(correctCount, isBonusCorrect) {
    const secondPlace = 2;
    const thirdPlace = 3;

    if (LOTTO_SYSTEM.ranking[correctCount] === thirdPlace && isBonusCorrect) {
      return secondPlace;
    }

    return LOTTO_SYSTEM.ranking[correctCount];
  }
}

export default LottoDrawingMachine;
