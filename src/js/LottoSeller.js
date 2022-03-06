import { countingDuplicates } from './utils';
import { MONEY } from './constants';

export default class LottoSeller {
  #lastWeekWinningLottoList = [];

  #lastWeekWinningBonusNumber = 0;

  #purchasedAmount = 0;

  #winningAmount = Object.freeze({
    firstWinner: 2000000000,
    secondWinner: 30000000,
    thirdWinner: 1500000,
    forthWinner: 50000,
    fifthWinner: 5000,
    failed: 0,
  });

  #winningCount = {
    firstWinner: 0,
    secondWinner: 0,
    thirdWinner: 0,
    forthWinner: 0,
    fifthWinner: 0,
    failed: 0,
  };

  getLastWeekWinningLottoList() {
    return this.#lastWeekWinningLottoList;
  }

  getLastWeekWinningBonusNumber() {
    return this.#lastWeekWinningBonusNumber;
  }

  setLastWeekWinningLottoNumbers({ winningNumberList, bonusNumber }) {
    this.#lastWeekWinningLottoList = winningNumberList;
    this.#lastWeekWinningBonusNumber = bonusNumber;
  }

  getWinningAmount() {
    return this.#winningAmount;
  }

  setPurchasedAmount(count) {
    this.#purchasedAmount = count * MONEY.STANDARD;
  }

  getPurchasedAmount() {
    return this.#purchasedAmount;
  }

  setWinningCount(userAllLottoList, lastWeekLottoList, lastWeekBounsNumber) {
    Object.keys(this.#winningCount).forEach((winningKey) => {
      this.#winningCount[winningKey] = userAllLottoList.filter(
        (userLottoList) =>
          this.confirmLottoList(
            userLottoList,
            lastWeekLottoList,
            lastWeekBounsNumber
          ) === this.#winningAmount[winningKey]
      ).length;
    });
  }

  getWinningCount() {
    return this.#winningCount;
  }

  confirmLottoList(userLottoList, lastWeekLottoList, lastWeekBounsNumber) {
    const count = countingDuplicates(userLottoList, lastWeekLottoList);

    if (count === 2 || count === 1 || count === 0) {
      return this.#winningAmount.failed;
    }

    if (count === 3) {
      return this.#winningAmount.fifthWinner;
    }

    if (count === 4) {
      return this.#winningAmount.forthWinner;
    }

    if (count === 5 && userLottoList.includes(lastWeekBounsNumber)) {
      return this.#winningAmount.secondWinner;
    }

    if (count === 5) {
      return this.#winningAmount.thirdWinner;
    }

    return this.#winningAmount.firstWinner;
  }

  totalWinningAmount() {
    const totalAmountList = Object.keys(this.#winningAmount).map(
      (amountKey) =>
        this.#winningAmount[amountKey] * this.#winningCount[amountKey]
    );

    return totalAmountList.reduce((sum, amount) => amount + sum, 0);
  }
}
