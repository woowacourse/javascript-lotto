import { getRandomNumber } from './utils/utils.js';

export default class Lotto {
  static LOTT0_LENGTH = 6;

  constructor() {
    this._numbers = new Set();
    this.matchingNumbers = 0;
    this.isMatchBonus = false;
    // this.rank = Infinity;
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

  // Test를 위한 setter 생성
  set numbers(numsArray) {
    this._numbers = numsArray;
  }

  get numberDetail() {
    return [...this._numbers.values()].join(', ');
  }

  addMatchNumbers() {
    this.matchingNumbers++;
  }

  setMatchBonus() {
    this.isMatchBonus = true;
  }

  // updateRank(rank) {
  //   switch (this.matchingNumbers) {
  //     case '6':
  //       this.rank = 1;
  //     case '5': //
  //       this.rank = 2; // 2등
  //     case '4':

  //   }
  //   this.rank = rank;
  // }
}
