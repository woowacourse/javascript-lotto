import { LOTTO } from '../constants/constants.js';
import Lotto from '../domains/Lotto.js';
import validateMoney from '../validations/LottoMachine.js';
import LottoStrategy from './LottoStrategy.js';
export default class LottoMachine {
  #inputMoney;
  #lottos;
  #strategy;
  #totalMoney;

  constructor() {
    this.#inputMoney = 0;
    this.#lottos = [];
    this.#totalMoney = 0;
    this.#strategy = new LottoStrategy();
  }

  get inputMoney() {
    return this.#inputMoney;
  }

  set inputMoney(money) {
    validateMoney(money);
    this.#inputMoney = money;
  }

  get lottos() {
    return this.#lottos;
  }

  get lottoQuantity() {
    return this.#inputMoney / LOTTO.PRICE;
  }

  get profitRate() {
    const totalProfit = this.#lottos.reduce(
      (prev, acc) => prev + acc.result.price,
      0
    );
    return ((totalProfit * 100) / this.#totalMoney).toFixed(2);
  }

  init() {
    this.#inputMoney = 0;
    this.#lottos = [];
    this.#totalMoney = 0;
  }

  getNumberOfGrade(type) {
    return this.#lottos.filter(({ result: { grade } }) => grade === type)
      .length;
  }

  updateStrategy(strategy) {
    this.#strategy = strategy;
  }

  operateLottoMachine() {
    this.#lottos = this.generateLottos();
    this.#totalMoney += this.#inputMoney;
    this.#inputMoney = 0;
  }

  generateLottos() {
    return Array(this.lottoQuantity)
      .fill()
      .map(() => new Lotto(this.#strategy).generate());
  }

  calculateGrade(winningNumbers, bonusNumber) {
    this.#lottos.forEach((lotto) =>
      lotto.generateGrade(winningNumbers, bonusNumber)
    );
  }
}
