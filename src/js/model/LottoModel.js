import { LOTTO_NUMBERS, ALERT_MESSAGE } from '../constants';

export default class LottoModel {
  constructor() {
    this.lottoCount = 0;
    this.lottos = [];
  }

  setLottoCount(inputPrice) {
    this.checkValidLottoCount(inputPrice);
    this.lottoCount = inputPrice / LOTTO_NUMBERS.LOTTO_PRICE;
  }

  getLottoCount() {
    return this.lottoCount;
  }

  checkValidLottoCount(value) {
    if (!this.isNumber(value)) {
      throw Error(ALERT_MESSAGE.MUST_NUMBER);
    }
    if (!this.isOverThousand(value)) {
      throw Error(ALERT_MESSAGE.OVER_THOUSAND_INPUT);
    }
    if (!this.isDividedThousand(value)) {
      throw Error(ALERT_MESSAGE.DIVIDED_BY_THOUSAND);
    }
  }

  isDividedThousand = (value) => value % LOTTO_NUMBERS.LOTTO_PRICE === 0;

  isOverThousand = (value) => value >= LOTTO_NUMBERS.LOTTO_PRICE;

  isNumber = (value) => value.match(/[0-9]/);

  getRandomNumber = (min, max) => Math.floor(Math.random() * max + min);

  getLottoNumbers() {
    const lottoNumberSet = new Set();
    while (lottoNumberSet.size < LOTTO_NUMBERS.LOTTO_LENGTH) {
      lottoNumberSet.add(this.getRandomNumber(LOTTO_NUMBERS.MIN_LOTTO_NUMBER, LOTTO_NUMBERS.MAX_LOTTO_NUMBER));
    }
    return [...lottoNumberSet];
  }

  setLottos() {
    for (let i = 0; i < this.getLottoCount(); i += 1) {
      this.lottos.push(this.getLottoNumbers());
    }
  }

  getLottos() {
    return this.lottos;
  }
}
