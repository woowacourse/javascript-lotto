const LottoResult = require('./LottoResult');
const { NUMBER } = require('../utils/constant');

class LottoMachine {
  lottoNumber;
  #lottoResult;

  constructor() {
    this.lottoNumber = [];
    this.#lottoResult = new LottoResult();
  }

  countLotto(money) {
    return Number(money) / NUMBER.THOUSAND;
  }

  get lottoNumber() {
    return this.lottoNumber;
  }

  setLottoNumber(lottoList) {
    this.lottoNumber = lottoList;
  }

  makeLotto(money) {
    const number = this.countLotto(money);
    this.setLottoNumber(Array.from({ length: number }, () => this.randomNumberLotto()));
  }

  ascendingSortedNumber(number) {
    return number.sort((a, b) => a - b);
  }

  randomNumberLotto() {
    const randomNumber = Array.from({ length: NUMBER.MAX_LENGHT }, () =>
      Math.floor(Math.random() * NUMBER.MAX_NUMBER + NUMBER.MIN_NUMBER)
    );
    if (this.hasDuplicates(randomNumber)) return this.ascendingSortedNumber(randomNumber);
    return this.randomNumberLotto();
  }

  hasDuplicates(randomNumber) {
    console.log(new Set(randomNumber).size)
    return new Set(randomNumber).size === NUMBER.MAX_LENGHT;
  }

  getWinningStatus(winningNumber, bonusNumber) {
    const ranks = this.compareNumber(winningNumber, bonusNumber);
    const result = this.#lottoResult.getResult(ranks);
    return result;
  }

  compareNumber(winningNumber, bonusNumber) {
    const ranks = [];
    this.lottoNumber.forEach(numbers => {
      const matchedNumber = numbers.filter(number => winningNumber.includes(String(number))).length;
      if (matchedNumber === NUMBER.RANK_THIRD) return ranks.push(this.bouseNumberChecked(numbers, Number(bonusNumber)));
      if (matchedNumber >= NUMBER.RANK_FIFTH) ranks.push(matchedNumber);
    });
    return ranks;
  }

  bouseNumberChecked(numbers, bonusNumber) {
    if (numbers.includes(bonusNumber)) return NUMBER.RANK_SECOND;
    return NUMBER.RANK_THIRD;
  }

  getProfitRate(money, result) {
    this.#lottoResult.earningsRate(money, result);
    return this.#lottoResult.getProfit;
  }
}

module.exports = LottoMachine;
