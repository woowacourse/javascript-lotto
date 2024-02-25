import OPTIONS from '../constant/Options.js';
import Random from '../util/Random.js';
import Lotto from './Lotto.js';

class LottoMachine {
  calculateIssueQuantity(purchaseAmount) {
    return Math.floor(purchaseAmount / OPTIONS.LOTTO.price);
  }

  issueLottos(issueQuantity) {
    return Array.from({ length: issueQuantity }, () => new Lotto(this.#pickLottoNumbers()));
  }

  #pickLottoNumbers() {
    return Random.pickCombination(
      OPTIONS.LOTTO.minNumber,
      OPTIONS.LOTTO.maxNumber,
      OPTIONS.LOTTO.count
    );
  }

  determineLottoRanks(lottos, winningLotto) {
    const winningResult = { ...OPTIONS.WINNING_RESULT };

    lottos.forEach((lotto) => {
      const rank = winningLotto.determineRank(lotto);
      winningResult[rank] += 1;
    });

    return winningResult;
  }

  calculateProfitRate(winningResult) {
    const totalPrizeAmount = Object.entries(winningResult).reduce((sum, [rank, count]) => {
      return sum + count * OPTIONS.PRIZE_BY_RANK[rank];
    }, 0);

    const totalPurchaseAmount =
      Object.values(winningResult).reduce((sum, count) => {
        return sum + count;
      }, 0) * OPTIONS.LOTTO.price;

    return (totalPrizeAmount / totalPurchaseAmount) * 100;
  }
}

export default LottoMachine;
