import Calculator from '../EventListener/Calculator.js';
import WINNING_AMOUNT_OF_LOTTO from '../constant/index.js';

export default class ReturnOfCalculator extends Calculator {
  constructor(buyCount, matchResult) {
    super();
    this.buyCount = buyCount;
    this.matchResult = matchResult;
  }

  execute() {
    return (this.profits() / (this.buyCount * this.unit)) * 100;
  }

  profits() {
    return this.matchResult.reduce(
      (acc, [matchCount, lottoCount]) => acc + WINNING_AMOUNT_OF_LOTTO[matchCount] * lottoCount,
      0,
    );
  }
}
