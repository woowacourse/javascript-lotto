import getRandomNumber from '../utils/random';

import { LOTTO_NUMBERS } from '../constants/index';
import { checkValidLottoCount, checkValidWinningLottoNumbers } from '../utils/validator';

export default class LottoModel {
  constructor() {
    this.lottoCount = 0;
    this.lottos = [];
    this.winningLottoNumbers = {
      winningNumbers: [],
      bonusNumber: 0,
    };
    this.winningType = {
      3: 0,
      4: 0,
      5: 0,
      5.5: 0,
      6: 0,
    };
  }

  setLottoCount(lottoCount) {
    this.lottoCount = lottoCount;
  }

  calculateLottoCount(lottoPriceInput) {
    checkValidLottoCount(lottoPriceInput);

    this.setLottoCount(lottoPriceInput / LOTTO_NUMBERS.LOTTO_PRICE);
  }

  getLottoCount() {
    return this.lottoCount;
  }

  generateLottoNumbers() {
    const lottoNumberSet = new Set();
    while (lottoNumberSet.size < LOTTO_NUMBERS.LOTTO_LENGTH) {
      lottoNumberSet.add(getRandomNumber(LOTTO_NUMBERS.MIN_LOTTO_NUMBER, LOTTO_NUMBERS.MAX_LOTTO_NUMBER));
    }
    return [...lottoNumberSet];
  }

  setLottos(lottos) {
    this.lottos = lottos;
  }

  getLottos() {
    return this.lottos;
  }

  generateLottos() {
    return Array.from({ length: this.getLottoCount() }, (v) => this.generateLottoNumbers());
  }

  buyLottos(lottoPriceInput) {
    this.calculateLottoCount(lottoPriceInput);
    this.setLottos(this.generateLottos());
  }

  getTotalWinningLottoNumbers(winnerNumberArray, bonusNumber) {
    return winnerNumberArray.concat(bonusNumber);
  }

  setWinningLottoNumbers(winnerNumberArray, bonusNumber) {
    checkValidWinningLottoNumbers(this.getTotalWinningLottoNumbers(winnerNumberArray, bonusNumber));

    this.winningLottoNumbers.winningNumbers = winnerNumberArray;
    this.winningLottoNumbers.bonusNumber = bonusNumber;
  }

  calculateWinningNumbers() {
    this.lottos.forEach((lotto) => {
      let winningCount = 2 * lotto.length - [...new Set(lotto.concat(this.winningLottoNumbers.winningNumbers))].length;

      if (winningCount === 5 && lotto.includes(this.winningLottoNumbers.bonusNumber)) {
        winningCount += 0.5;
      }

      if (winningCount >= 3) {
        this.winningType[winningCount] += 1;
      }
    });

    return this.winningType;
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

  calculateEarningRate() {
    const winningPriceInfo = {
      3: 5000,
      4: 50000,
      5: 1500000,
      5.5: 30000000,
      6: 2000000000,
    };

    return Math.floor(
      (Object.entries(this.winningType).reduce((acc, cur) => acc + winningPriceInfo[cur[0]] * cur[1], 0) / (this.lottoCount * 1000)) * 100,
    );
  }

  initGame() {
    this.lottoCount = 0;
    this.lottos = [];
    this.winningLottoNumbers = {
      winningNumbers: [],
      bonusNumber: 0,
    };
    this.winningType = {
      3: 0,
      4: 0,
      5: 0,
      5.5: 0,
      6: 0,
    };
  }
}
