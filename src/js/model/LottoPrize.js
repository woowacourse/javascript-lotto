import { PRIZE_MONEY, SAME_NUMBER_COUNT } from '../constants/prize.js';

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

  countPrize({ sameNumberCount, numbers, bonusNumber }) {
    switch (sameNumberCount) {
      case SAME_NUMBER_COUNT.FIRST:
        this.prizeCount.first += 1;
        break;

      case SAME_NUMBER_COUNT.FOURTH:
        this.prizeCount.fourth += 1;
        break;

      case SAME_NUMBER_COUNT.FIFTH:
        this.prizeCount.fifth += 1;
        break;

      default:
        this.checkBonusNumberToCount(sameNumberCount, numbers, bonusNumber);
        break;
    }
  }

  checkBonusNumberToCount(sameNumberCount, numbers, bonusNumber) {
    if (sameNumberCount !== SAME_NUMBER_COUNT.SECOND_OR_THIRD) {
      return;
    }

    if (numbers.includes(bonusNumber)) {
      this.prizeCount.second += 1;
      return;
    }

    this.prizeCount.third += 1;
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
