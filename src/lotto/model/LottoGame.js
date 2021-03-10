import { getRandomNumber } from '../../utils/random.js';
import {
  LOTTO,
  REWARDS,
  BONUS_ITEM_MATCH_COUNT,
  GAME,
} from '../../constants.js';

export default class LottoGame {
  initGame() {
    this.initLottoItemList();
    this.#winningNumberList = [];
    this.#bonusNumber = null;
    this.#deposit = 0;
  }

  initLottoItemList() {
    this.#lottoItemList = [];
  }

  addLottoItem(lottoNumberList) {
    if (
      !Array.isArray(lottoNumberList) ||
      lottoNumberList.length !== LOTTO.NUMBER_LIST_LENGTH
    )
      return;

    this.#lottoItemList.push({
      lottoNumberList,
      matchCount: 0,
      bonusNumberMatched: false,
    });
  }

  addLottoItems = (lottoItemCount) => {
    [...Array(lottoItemCount)].forEach(() => this.#addRandomLottoItem());
  };

  saveDeposit = (money) => {
    if (Number.isNaN(money) || money <= 0) return;

    this.#deposit += money;
  };

  spendOneLottoMoney = () => {
    this.#deposit -= LOTTO.PRICE;
  };

  spendAsManyMoney = () => {
    this.#deposit = this.#deposit % LOTTO.PRICE;
  };

  getAffordableLottoItemCount() {
    return parseInt(this.#deposit / LOTTO.PRICE);
  }

  getRankItemList() {
    const rankItemList = REWARDS.map((reward) => {
      const winCountWithBonus = this.#getWinCountWithBonus(reward.matchCount);
      const winCount = this.#getWinCount(reward.matchCount, winCountWithBonus);
      return {
        ...reward,
        winCount: reward.shouldCheckBonus ? winCountWithBonus : winCount,
      };
    });

    return rankItemList;
  }

  getTotalProfit(rankItemList) {
    return rankItemList.reduce(
      (acc, rankItem) => acc + rankItem.money * rankItem.winCount,
      0
    );
  }

  assignMatchCount() {
    this.#lottoItemList.forEach((lottoItem) => {
      const allNumberList = [
        ...lottoItem.lottoNumberList,
        ...this.#winningNumberList,
      ];
      const matchedCount = allNumberList.length - new Set(allNumberList).size;
      lottoItem.bonusNumberMatched = lottoItem.lottoNumberList.includes(
        this.#bonusNumber
      );
      lottoItem.matchCount = matchedCount;
    });
  }

  assignInputNumbers(numbers) {
    if (
      !Array.isArray(numbers) ||
      numbers.length !== LOTTO.CORRECT_NUMBER_LENGTH
    )
      return;

    this.#bonusNumber = numbers.pop();
    this.#winningNumberList = numbers;
  }

  #getLottoNumberList() {
    const numberList = new Set();
    while (numberList.size < LOTTO.NUMBER_LIST_LENGTH) {
      numberList.add(getRandomNumber(LOTTO.MIN_NUMBER, LOTTO.MAX_NUMBER));
    }

    return [...numberList];
  }

  #getWinCountWithBonus(matchCount) {
    return this.#lottoItemList.filter(
      (lottoItem) =>
        lottoItem.bonusNumberMatched && lottoItem.matchCount === matchCount
    ).length;
  }

  #getWinCount(matchCount, winCountWithBonus) {
    const winCount = this.#lottoItemList.filter(
      (lottoItem) => lottoItem.matchCount === matchCount
    ).length;
    if (matchCount === BONUS_ITEM_MATCH_COUNT && winCountWithBonus) {
      return winCount - winCountWithBonus;
    }

    return winCount;
  }

  #addRandomLottoItem() {
    const lottoNumberList = this.#getLottoNumberList();
    this.#lottoItemList.push({
      lottoNumberList,
      matchCount: 0,
      bonusNumberMatched: false,
    });
  }

  #lottoItemList = [];
  #winningNumberList = [];
  #bonusNumber = null;
  #deposit = GAME.INITIAL_DEPOSIT;

  get LottoItemList() {
    return this.#lottoItemList;
  }

  get WinningNumberList() {
    return this.#winningNumberList;
  }

  get TotalCost() {
    return this.#lottoItemList.length * LOTTO.PRICE;
  }

  get Deposit() {
    return this.#deposit;
  }
}
