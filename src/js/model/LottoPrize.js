import { PRIZE_MONEY } from '../constants/prize.js';

export default class LottoPrize {
  constructor() {
    this.initialize();
  }

  initialize() {
    this.isCalculated = false;
    this.prizeCount = {
      first: 0,
      second: 0,
      third: 0,
      fourth: 0,
      fifth: 0,
    };
    this.rateOfReturn = 0;
  }

  setIsCalculated() {
    this.isCalculated = true;
  }

  countPrize(sameNumberCount, numbers, bonusNumber) {
    switch (sameNumberCount) {
      case 6:
        this.prizeCount.first += 1;
        break;

      case 4:
        this.prizeCount.fourth += 1;
        break;

      case 3:
        this.prizeCount.fifth += 1;
        break;

      default:
        this.competeForSecondPrize(sameNumberCount, numbers, bonusNumber);
        break;
    }
  }

  competeForSecondPrize(sameNumberCount, numbers, bonusNumber) {
    if (sameNumberCount !== 5) {
      return;
    }

    switch (numbers.includes(bonusNumber)) {
      case true:
        this.prizeCount.second += 1;
        break;

      case false:
        this.prizeCount.third += 1;
        break;

      default:
        break;
    }
  }

  calculateRateOfReturn(inputMoney) {
    const firstValue = inputMoney;
    const lastValue =
      this.prizeCount.first * PRIZE_MONEY.FIRST +
      this.prizeCount.second * PRIZE_MONEY.SECOND +
      this.prizeCount.third * PRIZE_MONEY.THIRD +
      this.prizeCount.fourth * PRIZE_MONEY.FOURTH +
      this.prizeCount.fifth * PRIZE_MONEY.FIFTH;

    this.rateOfReturn = ((lastValue - firstValue) / firstValue) * 100;
  }
}
