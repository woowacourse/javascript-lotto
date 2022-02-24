import getTotalWinningLottoNumbers from '../utils/getTotalWinningLottoNumbers';
import getRandomNumber from '../utils/random';

import { LOTTO_NUMBERS } from '../constants/index';
import { checkValidLottoCount, checkValidWinningNumbers } from '../utils/validator';

export default class LottoModel {
  #lottoCount;

  #lottos;

  #winningLottoNumbers;

  #winningType;

  #earningRate;

  constructor() {
    this.#lottoCount = 0;
    this.#lottos = [];
    this.#winningLottoNumbers = {
      winningNumbers: [],
      bonus: 0,
    };
    this.#winningType = {
      3: 0,
      4: 0,
      5: 0,
      5.5: 0,
      6: 0,
    };
    this.#earningRate = 0;
  }

  setLottoCount(value) {
    checkValidLottoCount(value);
    this.#lottoCount = value / LOTTO_NUMBERS.LOTTO_PRICE;
  }

  getLottoCount() {
    return this.#lottoCount;
  }

  getLottoNumbers() {
    const lottoNumberSet = new Set();
    while (lottoNumberSet.size < LOTTO_NUMBERS.LOTTO_LENGTH) {
      lottoNumberSet.add(
        getRandomNumber(LOTTO_NUMBERS.MIN_LOTTO_NUMBER, LOTTO_NUMBERS.MAX_LOTTO_NUMBER),
      );
    }
    return [...lottoNumberSet];
  }

  setLottos(lottos) {
    this.#lottos = lottos;
  }

  getLottos() {
    return this.#lottos;
  }

  buyLottos(inputMoney) {
    this.setLottoCount(inputMoney);
    this.setLottos(this.generateLottos());
  }

  setWinningLottoNumbers(winnerNumberArray, bonusNumber) {
    checkValidWinningNumbers(getTotalWinningLottoNumbers(winnerNumberArray, bonusNumber));

    this.#winningLottoNumbers.winningNumbers = winnerNumberArray;
    this.#winningLottoNumbers.bonus = bonusNumber;
  }

  generateLottos() {
    const lottos = [];
    for (let i = 0; i < this.getLottoCount(); i += 1) {
      lottos.push(this.getLottoNumbers());
    }

    return lottos;
  }

  setWinningNumbers() {
    this.#lottos.forEach((lotto) => {
      let winningCount =
        2 * lotto.length -
        [...new Set(lotto.concat(this.#winningLottoNumbers.winningNumbers))].length;

      if (winningCount === 5 && lotto.includes(this.#winningLottoNumbers.bonus)) {
        winningCount += 0.5;
      }

      if (winningCount >= 3) {
        this.#winningType[winningCount] += 1;
      }
    });
  }

  setEarningRate() {
    const winningPriceInfo = {
      3: LOTTO_NUMBERS.FIFTH_WINNINGS,
      4: LOTTO_NUMBERS.FOURTH_WINNINGS,
      5: LOTTO_NUMBERS.THIRD_WINNINGS,
      5.5: LOTTO_NUMBERS.SECOND_WINNINGS,
      6: LOTTO_NUMBERS.FIRST_WINNINGS,
    };

    this.#earningRate = Math.floor(
      (Object.entries(this.#winningType).reduce(
        (acc, cur) => acc + winningPriceInfo[cur[0]] * cur[1],
        0,
      ) /
        (this.#lottoCount * LOTTO_NUMBERS.LOTTO_PRICE)) *
        100,
    );
  }

  calculateLottoResult(winningArray, bonusNumber) {
    this.setWinningLottoNumbers(winningArray, bonusNumber);
    this.setWinningNumbers();
    this.setEarningRate();
  }

  getLottoResultInfo() {
    return {
      winningType: this.#winningType,
      earningRate: this.#earningRate,
    };
  }

  initWinningType() {
    this.winningType = {
      3: 0,
      4: 0,
      5: 0,
      5.5: 0,
      6: 0,
    };
  }

  initGame() {
    this.#lottoCount = 0;
    this.#lottos = [];
    this.#winningLottoNumbers = {
      winningNumbers: [],
      bonus: 0,
    };
    this.#winningType = {
      3: 0,
      4: 0,
      5: 0,
      5.5: 0,
      6: 0,
    };
    this.#earningRate = 0;
  }
}
