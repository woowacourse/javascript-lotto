import getTotalWinningLottoNumbers from '../utils/getTotalWinningLottoNumbers';
import pickNumberInList from '../utils/random';

import { LOTTO_NUMBERS } from '../constants/index';
import { checkValidLottoCount, checkValidWinningNumbers } from '../utils/validator';

export default class LottoModel {
  #lottos;

  #winningLottoNumbers;

  #winningType;

  #earningRate;

  constructor() {
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

  getLottoCount() {
    return this.#lottos.length;
  }

  getLottoNumbers() {
    const checkLottoNumberArray = [...Array(LOTTO_NUMBERS.MAX_LOTTO_NUMBER)].map(
      (_, idx) => idx + 1,
    );
    const lottoNumberArray = [];

    for (let i = 0; i < LOTTO_NUMBERS.LOTTO_LENGTH; i += 1) {
      const num = pickNumberInList(checkLottoNumberArray);
      lottoNumberArray.push(num);

      const idx = checkLottoNumberArray.findIndex((lottoNumber) => lottoNumber === num);
      checkLottoNumberArray.splice(idx, 1);
    }

    return [...lottoNumberArray];
  }

  setLottos(lottos) {
    this.#lottos = lottos;
  }

  getLottos() {
    return this.#lottos;
  }

  buyLottos(inputMoney) {
    checkValidLottoCount(inputMoney);
    this.setLottos(this.generateLottos(inputMoney / LOTTO_NUMBERS.LOTTO_PRICE));
  }

  setWinningLottoNumbers(winnerNumberArray, bonusNumber) {
    checkValidWinningNumbers(getTotalWinningLottoNumbers(winnerNumberArray, bonusNumber));

    this.#winningLottoNumbers.winningNumbers = winnerNumberArray;
    this.#winningLottoNumbers.bonus = bonusNumber;
  }

  generateLottos(lottoCount) {
    return Array.from({ length: lottoCount }, () => this.getLottoNumbers());
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
        0 - this.getLottoCount() * LOTTO_NUMBERS.LOTTO_PRICE,
      ) /
        (this.getLottoCount() * LOTTO_NUMBERS.LOTTO_PRICE)) *
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
    this.#winningType = {
      3: 0,
      4: 0,
      5: 0,
      5.5: 0,
      6: 0,
    };
  }

  initGame() {
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
