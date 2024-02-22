import OPTIONS from '../constant/Options.js';
import Random from '../util/random/Random.js';
import PurchaseAmountValidator from '../util/validation/PurchaseAmountValidator.js';
import Lotto from './Lotto.js';

class LottoMachine {
  calculateIssueQuantity(purchaseAmount) {
    PurchaseAmountValidator.validate(purchaseAmount);

    return parseInt(purchaseAmount / OPTIONS.LOTTO.price, 10);
  }

  issueLottos(issueQuantity) {
    return Array.from({ length: issueQuantity }, () => new Lotto(this.#pickLottoNumbers()));
  }

  #pickLottoNumbers() {
    return Random.pickCombination(
      OPTIONS.LOTTO.minNumber,
      OPTIONS.LOTTO.maxNumber,
      OPTIONS.LOTTO.combination
    );
  }

  determineLottoRanks(lottos, winningNumbers, bonusNumber) {
    const winningResult = OPTIONS.WINNING_RESULT;

    lottos.forEach((lotto) => {
      const rank = lotto.determineRank(winningNumbers, bonusNumber);
      winningResult[rank] += 1;
    });

    return winningResult;
  }

  calculateProfitRate(winningResult) {
    const totalPrizeAmount = this.#calculateTotalPrizeAmount(winningResult);
    const totalPurchaseAmount = this.#calculateTotalPurchaseAmount(winningResult);
    const profitRate = this.#caclulateProfitRate(totalPrizeAmount, totalPurchaseAmount);

    return profitRate;
  }

  #calculateTotalPrizeAmount(winningResult) {
    return Object.entries(winningResult).reduce((totalPrizeAmount, [rank, count]) => {
      return totalPrizeAmount + count * OPTIONS.PRIZE_BY_RANK[rank];
    }, 0);
  }

  #calculateTotalPurchaseAmount(winningResult) {
    return (
      Object.values(winningResult).reduce((sum, count) => {
        return sum + count;
      }) * OPTIONS.LOTTO.price
    );
  }

  #caclulateProfitRate(totalPrizeAmount, totalPurchaseAmount) {
    return (totalPrizeAmount / totalPurchaseAmount) * 100;
  }
}

export default LottoMachine;
