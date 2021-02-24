import { getRandomNumber } from './utils/utils.js';

export default class Lotto {
  static LOTT0_LENGTH = 6;

  constructor() {
    this._numbers = new Set();
    this.matchingNumbers = 0;
    this.isMatchBonus = false;
    this._rank = Infinity;

    this.initNumbers();
  }

  initNumbers() {
    while (this._numbers.size < Lotto.LOTT0_LENGTH) {
      this._numbers.add(getRandomNumber());
    }
  }

  get numbers() {
    return this._numbers;
  }

  get numberDetailString() {
    return [...this._numbers.values()].join(', ');
  }

  get rank() {
    return this._rank;
  }

  // Test를 위한 setter 생성
  set numbers(numsArray) {
    this._numbers = numsArray;
  }

  addMatchNumbers() {
    this.matchingNumbers++;
  }

  setMatchBonus() {
    this.isMatchBonus = true;
  }

  updateRank() {
    switch (this.matchingNumbers) {
      case 6:
        this._rank = 1;
        break;
      case 5:
        this._rank = this.isMatchBonus ? 2 : 3;
        break;
      case 4:
        this._rank = 4;
        break;
      case 3:
        this._rank = 5;
        break;
      default:
        this._rank = Infinity;
    }
  }
}
