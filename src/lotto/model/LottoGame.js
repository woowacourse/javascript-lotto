import { getRandomNumber } from '../../utils/random.js';
import {
  LOTTO,
  REWARDS,
  BONUS_ITEM_MATCH_COUNT,
  GAME
} from '../../constants.js';

export default class LottoGame {
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

  initGame() {
    this.initLottoItemList();
    this.#winningNumberList = [];
    this.#bonusNumber = null;
    this.#deposit = 0;
  }

  initLottoItemList() {
    this.#lottoItemList = [];
  }

  addLottoItems = (lottoItemCount) => {
    [...Array(lottoItemCount)].forEach(() => this.#addLottoItem());
  }

  saveDeposit = (money) => {
    this.#deposit += money;
  }

  spendDeposit = () => {
    this.#deposit = this.#deposit % LOTTO.PRICE;
  }

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


  #addLottoItem() {
    const lottoNumberList = this.#getLottoNumberList();
    this.#lottoItemList.push({
      lottoNumberList,
      matchCount: 0,
      bonusNumberMatched: false,
    });
  }

  
}