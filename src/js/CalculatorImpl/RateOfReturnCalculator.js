import Calculator from '../EventListener/Calculator.js';

const WINNING_AMOUNT_OF_LOTTO = {
  3: 5000,
  4: 50000,
  5: 1500000,
  7: 30000000,
  6: 2000000000,
};

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
