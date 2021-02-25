import { getRandomNumber } from '../utils/random.js';
import {
  LOTTO,
  REWARDS,
  BONUS_ITEM_MATCH_COUNT
} from '../constants.js';

export default class LottoGame {
  #lottoItemList = [];
  #winningNumberList = [];
  #bonusNumber = null;

  get lottoItemList() {
    return this.#lottoItemList;
  }

  get winningNumberList() {
    return this.#winningNumberList;
  }

  get totalCost() {
    return this.#lottoItemList.length * LOTTO.PRICE;
  }

  initGame() {
    this.initLottoItemList();
    this.#winningNumberList = [];
    this.#bonusNumber = null;
  }

  initLottoItemList() {
    this.#lottoItemList = [];
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
    this.#bonusNumber = numbers.pop();
    this.#winningNumberList = numbers;
  }

  #addLottoItem() {
    const lottoNumberList = this.#getLottoNumberList();
    this.#lottoItemList.push({
      lottoNumberList,
      matchCount: 0,
      bonusNumberMatched: false,
    });
  }

  addLottoItems = (lottoItemCount) => {
    [...Array(lottoItemCount)].forEach(() => this.#addLottoItem());
  };
}