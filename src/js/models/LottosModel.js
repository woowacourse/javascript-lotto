import { LOTTO_SETTING } from '../constants/setting';
import { getListDuplicateCount } from '../utils/data-manager';

import Lotto from './Lotto';

export default class LottosModel {
  #lottos = [];
  #winningNumberList = [];
  #bonusNumber = 0;

  buy(inputMoney) {
    const lottoCount = inputMoney / LOTTO_SETTING.PRICE;
    Array.from({ length: lottoCount }, () => {
      const lottoInstance = new Lotto();
      lottoInstance.generateNumberList();

      this.#lottos.push(lottoInstance);
    });
  }

  get list() {
    return this.#lottos.map((value) => value.pickedNumber.join(', '));
  }

  get winningNumberList() {
    return this.#winningNumberList;
  }

  set winningNumberList(numberList) {
    const arrayToNumberList = numberList.map((value) => Number(value));
    const { LOTTO_NUMBER_LENGTH, BONUS_NUMBER_LENGTH } = LOTTO_SETTING;

    this.#winningNumberList = arrayToNumberList.slice(0, LOTTO_NUMBER_LENGTH);
    this.#bonusNumber = arrayToNumberList
      .slice(LOTTO_NUMBER_LENGTH, LOTTO_NUMBER_LENGTH + BONUS_NUMBER_LENGTH)
      .shift();
  }

  #isBonusWinner(lottoNumberList, matchCount) {
    const bonusWinnerRange = LOTTO_SETTING.LOTTO_NUMBER_LENGTH - LOTTO_SETTING.BONUS_NUMBER_LENGTH;
    return matchCount === bonusWinnerRange && lottoNumberList.includes(this.#bonusNumber);
  }

  getRankNumber(lottoNumberList) {
    const { RACKING_START_NUMBER, WINNING_MIN_MATCH_NUMBER } = LOTTO_SETTING;

    const matchCount = getListDuplicateCount(lottoNumberList, this.#winningNumberList);
    const rankNumber = RACKING_START_NUMBER + WINNING_MIN_MATCH_NUMBER - matchCount;

    if (this.#isBonusWinner(lottoNumberList, matchCount)) {
      return 2;
    }

    if (LOTTO_SETTING.LOTTO_NUMBER_LENGTH === matchCount) {
      return 1;
    }

    return rankNumber;
  }

  get result() {
    return '';
  }
}
