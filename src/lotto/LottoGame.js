import { getRandomNumber } from '../utils/random.js';
import {
  MAX_NUMBER,
  MIN_NUMBER,
  NUMBER_LIST_LENGTH,
  LOTTO_PRICE,
  REWARDS,
} from '../constants.js';

export default class LottoGame {
  #lottoItemList = [];
  #winningNumberList = [];
  #bonusNumber;

  get lottoItemList() {
    return this.#lottoItemList;
  }

  get winningNumberList() {
    return this.#winningNumberList;
  }

  get totalCost(){
    return this.#lottoItemList.length * LOTTO_PRICE
  }

  #getLottoNumberList() {
    const numberList = new Set();
    while (numberList.size < NUMBER_LIST_LENGTH) {
      numberList.add(getRandomNumber(MIN_NUMBER, MAX_NUMBER));
    }

    return [...numberList];
  }

  assignMatchCount() {
    this.#lottoItemList.forEach((lottoItem) => {
      const allNumberList = [
        ...lottoItem.lottoNumberList,
        ...this.winningNumberList,
      ];
      const matchedCount = allNumberList.length - new Set(allNumberList).size;
      lottoItem.bonusNumberMatched = lottoItem.lottoNumberList.includes(
        this.#bonusNumber
      );
      lottoItem.matchCount = matchedCount;
    });
  }

  #getWinCountWithBonus(matchCount) {
    return this.#lottoItemList.filter(
      (lottoItem) =>
        lottoItem.bonusNumberMatched &&
        lottoItem.matchCount === matchCount
    ).length;
  }

  #getWinCount(matchCount, winCountWithBonus) {
    const winCount = this.#lottoItemList.filter(
      (lottoItem) => lottoItem.matchCount === matchCount
    ).length;
    if (matchCount === 5 && winCountWithBonus) {
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

  initLottoItemList() {
    this.#lottoItemList = [];
  }

  addLottoItem() {
    const lottoNumberList = this.#getLottoNumberList();
    this.#lottoItemList.push({
      lottoNumberList,
      matchCount: 0,
      bonusNumberMatched: false,
    });
  }

  addLottoItems = (lottoItemCount) => {
    [...Array(lottoItemCount)].forEach(() => this.addLottoItem());
  };

  assignInputNumbers(numbers) {
    this.#bonusNumber = numbers.pop();
    this.#winningNumberList = numbers;
  }
}
