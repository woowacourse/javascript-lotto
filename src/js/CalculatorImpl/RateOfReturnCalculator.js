import Calculator from '../EventListener/Calculator.js';
import { WINNING_AMOUNT_OF_LOTTO } from '../constant/index.js';

export default class ReturnOfCalculator extends Calculator {
  constructor(buyCount, matchResult) {
    super();
    this.buyCount = buyCount;
    this.matchResult = matchResult;
  }

  execute() {
    return ((this.profits() - this.investment()) / this.investment()) * 100;
  }

  profits() {
    return Object.entries(this.matchResult).reduce(
      (acc, [matchCount, lottoCount]) => acc + WINNING_AMOUNT_OF_LOTTO[matchCount] * lottoCount,
      0,
    );
  }

  investment() {
    return this.buyCount * this.unit;
  }
}
