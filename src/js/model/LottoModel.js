import getRandomNumber from '../utils/random';

import { LOTTO_NUMBERS } from '../constants/index';
import checkValidLottoCount from '../utils/validator';

export default class LottoModel {
  constructor() {
    this.lottoCount = 0;
    this.lottos = [];
    this.winningLottoNumberes = {
      winningNumbers: [],
      bonusNumber: 0,
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
    const lottos = [];
    for (let i = 0; i < this.getLottoCount(); i += 1) {
      lottos.push(this.generateLottoNumbers());
    }
    return lottos;
  }

  buyLottos(lottoPriceInput) {
    this.calculateLottoCount(lottoPriceInput);
    this.setLottos(this.generateLottos());
  }

  setWinningLottoNumbers(winnerNumberArray, bonusNumber) {
    this.winningLottoNumberes.winningNumbers = winnerNumberArray;
    this.winningLottoNumberes.bonusNumber = bonusNumber;
  }
}
