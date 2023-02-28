import { NUMBER } from '../utils/constant.js';

export default class LottoMachine {
  lottoNumber;

  constructor() {
    this.lottoNumber = [];
  }

  countLotto(money) {
    return Number(money) / NUMBER.PURCHASE_AMOUNT;
  }

  get lottoNumber() {
    return this.lottoNumber;
  }

  setLottoNumber(figure) {
    this.lottoNumber = figure;
  }

  makeLotto(money) {
    const number = this.countLotto(money);
    this.setLottoNumber(Array.from({ length: number }, () => this.randomNumberLotto()));
  }

  sortedNumber(number) {
    return number.sort((a, b) => a - b);
  }

  randomNumberLotto() {
    const randomNumber = Array.from({ length: NUMBER.LOTTO_NUMBER_LENGTH }, () =>
      Math.floor(Math.random() * NUMBER.LOTTO_NUMBER_RANGE + NUMBER.LOTTO_NUMBER_START_ONE)
    );
    if (this.checkRepeatedNumber(randomNumber)) return this.sortedNumber(randomNumber);
    return this.randomNumberLotto();
  }

  checkRepeatedNumber(randomNumber) {
    return [...new Set(randomNumber)].length === NUMBER.LOTTO_NUMBER_LENGTH;
  }

  compareNumber(winningNumber, bonus) {
    const ranks = [];
    this.lottoNumber.forEach(numbers => {
      const matchedNumber = numbers.filter(number => winningNumber.includes(String(number))).length;
      if (matchedNumber === 5) return ranks.push(this.bouseNumberChecked(numbers, Number(bonus)));
      if (matchedNumber >= 3) ranks.push(matchedNumber);
    });
    return ranks;
  }
  bouseNumberChecked(numbers, bonus) {
    if (numbers.includes(bonus)) return NUMBER.RANK_SECOND;
    return NUMBER.RANK_THIRD;
  }
}
