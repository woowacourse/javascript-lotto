import { countingDuplicates, changeToUpperSnakeCase } from './utils';
import { MONEY, WINNING_AMOUNT } from './constants';

export default class LottoSeller {
  #lastWeekWinningLottoList = [];

  #lastWeekWinningBonusNumber = 0;

  #purchasedAmount = 0;

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
    return WINNING_AMOUNT;
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
          ) === WINNING_AMOUNT[changeToUpperSnakeCase(winningKey)]
      ).length;
    });
  }

  getWinningCount() {
    return this.#winningCount;
  }

  confirmLottoList(userLottoList, lastWeekLottoList, lastWeekBounsNumber) {
    const count = countingDuplicates(userLottoList, lastWeekLottoList);

    switch (count) {
      case 3:
        return WINNING_AMOUNT.FIFTH_WINNER;

      case 4:
        return WINNING_AMOUNT.FORTH_WINNER;

      case 5:
        if (userLottoList.includes(lastWeekBounsNumber)) {
          return WINNING_AMOUNT.SECOND_WINNER;
        }
        return WINNING_AMOUNT.THIRD_WINNER;

      case 6:
        return WINNING_AMOUNT.FIRST_WINNER;

      default:
        return WINNING_AMOUNT.FAILED;
    }
  }

  totalWinningAmount() {
    const totalAmountList = Object.keys(this.#winningCount).map(
      (amountKey) =>
        this.#winningCount[amountKey] *
        WINNING_AMOUNT[changeToUpperSnakeCase(amountKey)]
    );

    return totalAmountList.reduce((sum, amount) => amount + sum, 0);
  }
}
