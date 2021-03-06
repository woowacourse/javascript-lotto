import { getRandomNumber } from '../utils/random.js';
import { LOTTO, REWARDS, CHECK_SECOND_CONDITION_NUMBER } from '../constants.js';

export default class LottoGame {
  #lottoItemList;
  #remainLottoCount;
  #winningNumberList;
  #bonusNumber;

  constructor() {
    this.init();
  }

  get lottoItemList() {
    return this.#lottoItemList;
  }

  get remainLottoCount() {
    return this.#remainLottoCount;
  }

  get winningNumberList() {
    return this.#winningNumberList;
  }

  get totalCost() {
    return this.#lottoItemList.length * LOTTO.PRICE;
  }

  init() {
    this.#lottoItemList = [];
    this.#remainLottoCount = 0;
    this.#winningNumberList = [];
    this.#bonusNumber = null;
  }

  assignRemainLottoCount(count) {
    this.#remainLottoCount = count;
  }

  // 2등을 구하기 위해서 당첨 숫자의 일치개수가 5개인 경우에만 보너스숫자가 일치하는지 확인
  #assignBonusNumberMatched(lottoItem) {
    if (lottoItem.matchCount === CHECK_SECOND_CONDITION_NUMBER) {
      lottoItem.isBonusMatched = lottoItem.lottoNumberList.includes(
        this.#bonusNumber,
      );
    }
  }

  assignMatchCount() {
    this.#lottoItemList.forEach((lottoItem) => {
      const allNumberList = [...lottoItem.lottoNumberList, ...this.#winningNumberList];
      const matchCount = allNumberList.length - new Set(allNumberList).size;
      lottoItem.matchCount = matchCount;
      this.#assignBonusNumberMatched(lottoItem);
    });
  }

  #getWinCount(matchCount, isBonusMatched) {
    return this.#lottoItemList.filter(
      (lottoItem) =>
        lottoItem.matchCount === matchCount &&
        lottoItem.isBonusMatched === isBonusMatched,
    ).length;
  }

  getRankItemList() {
    const rankItemList = REWARDS.map((reward) => {
      const winCount = this.#getWinCount(
        reward.matchCount,
        reward.isBonusMatched,
      );
      
      return {
        ...reward,
        winCount,
      };
    });

    return rankItemList;
  }

  #getLottoNumberList() {
    const numberList = new Set();
    while (numberList.size < LOTTO.NUMBER_LIST_LENGTH) {
      numberList.add(getRandomNumber(LOTTO.MIN_NUMBER, LOTTO.MAX_NUMBER));
    }

    return [...numberList].sort((a, b) => a - b);
  }

  addLottoItem(lottoNumbers) {
    const lottoNumberList = lottoNumbers
      ? lottoNumbers.sort((a, b) => a - b)
      : this.#getLottoNumberList();

    this.#lottoItemList.push({
      lottoNumberList,
      matchCount: 0,
      isBonusMatched: false,
    });

    this.#remainLottoCount--;
  }

  addLottoItems = (lottoItemCount) => {
    [...Array(lottoItemCount)].forEach(() => this.addLottoItem());
  };

  assignCorrectNumbers(correctNumbers) {
    const copiedCorrectNumbers = [...correctNumbers];
    this.#bonusNumber = copiedCorrectNumbers.pop();
    this.#winningNumberList = copiedCorrectNumbers;
  }
}
