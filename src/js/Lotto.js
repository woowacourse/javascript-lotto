import { shuffleArray, createRandomNumberList } from './utils';
import { LOTTO } from './constants';

export default class Lotto {
  #lottoList = [];

  #winningAmount = {
    firstWinner: 2000000000,
    secondWinner: 30000000,
    thirdWinner: 1500000,
    forthWinner: 50000,
    fifthWinner: 5000,
    failed: 0,
  };

  #winningCount = {
    firstWinner: 0,
    secondWinner: 0,
    thirdWinner: 0,
    forthWinner: 0,
    fifthWinner: 0,
    failed: 0,
  };

  getWinningAmount() {
    return this.#winningAmount;
  }

  setLotto(count) {
    this.#lottoList = Array(count)
      .fill(0)
      .map((_, index, list) => (list[index] = this.createLottoList(count)));
  }

  getLotto() {
    return this.#lottoList;
  }

  setLottoCount(userAllLottoList, lastWeekLottoList, lastWeekBounsNumber) {
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

  createLottoList() {
    const shuffleRandomList = shuffleArray(createRandomNumberList());

    return Array(LOTTO.LENGTH)
      .fill(0)
      .map((_, index, list) => (list[index] = shuffleRandomList.pop()));
  }

  confirmLottoList(userLottoList, lastWeekLottoList, lastWeekBounsNumber) {
    let count = 0;

    userLottoList.forEach((userLottoNumber) => {
      lastWeekLottoList.forEach((lastWeekLottoNumber) => {
        if (userLottoNumber === lastWeekLottoNumber) {
          count++;
        }
      });
    });

    if (count === 6) {
      return this.#winningAmount.firstWinner;
    }

    if (count === 5) {
      if (userLottoList.includes(lastWeekBounsNumber)) {
        return this.#winningAmount.secondWinner;
      }

      return this.#winningAmount.thirdWinner;
    }

    if (count === 4) {
      return this.#winningAmount.forthWinner;
    }

    if (count === 3) {
      return this.#winningAmount.fifthWinner;
    }

    return this.#winningAmount.failed;
  }

  totalWinningAmount() {
    const totalAmountList = Object.keys(this.#winningAmount).map(
      (amountKey) =>
        this.#winningAmount[amountKey] * this.#winningCount[amountKey]
    );

    return totalAmountList.reduce((sum, amount) => amount + sum, 0);
  }
}
