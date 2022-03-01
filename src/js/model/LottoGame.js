import { Lotto } from './Lotto.js';
import { CONDITIONS } from '../constants/constants.js';

export class LottoGame {
  constructor() {
    this.moneyInput;
    this.lottoWallet = [];
    this.winningNumbers = [];
    this.bonusNumber;
    this.result = {
      matchSix: 0,
      matchFiveBonus: 0,
      matchFive: 0,
      matchFour: 0,
      matchThree: 0,
      matchUnderThree: 0,
    };
    this.earnRate;
  }

  insertMoney(moneyInput) {
    this.moneyInput = moneyInput;
  }

  buyLotto() {
    for (let i = 0; i * CONDITIONS.LOTTO_PRICE < this.moneyInput; i++) {
      this.lottoWallet.push(new Lotto());
    }
  }

  enterWinningNumbers(winningNumbers) {
    this.winningNumbers = [...new Set(winningNumbers)];
  }

  enterBonusNumber(bonusNumber) {
    this.bonusNumber = bonusNumber;
  }

  findResult() {
    const result = [];
    this.lottoWallet.forEach((lotto) => {
      let temp = this.winningNumbers.filter((num) => lotto.numbers.includes(num)).length;
      if (lotto.numbers.includes(this.bonusNumber)) {
        temp += 0.5;
      }
      result.push(temp);
    });

    this.saveResult(result);
  }

  saveResult(result) {
    let count = result.filter((element) => 6 === element).length;
    this.result.matchSix = count;

    count = result.filter((element) => 5.5 === element).length;
    this.result.matchFiveBonus = count;

    count = result.filter((element) => 5 === element).length;
    this.result.matchFive = count;

    count = result.filter((element) => 4 === element).length;
    this.result.matchFour = count;

    count = result.filter((element) => 3 === element).length;
    this.result.matchThree = count;

    count = result.filter((element) => 3 > element).length;
    this.result.matchUnderThree = count;
  }

  calculateEarnRate() {
    let earnMoney = 0;
    earnMoney += this.result.matchSix * 2000000000;
    earnMoney += this.result.matchFiveBonus * 30000000;
    earnMoney += this.result.matchFive * 1500000;
    earnMoney += this.result.matchFour * 50000;
    earnMoney += this.result.matchThree * 5000;

    this.earnRate = Number(((earnMoney / (this.lottoWallet.length * 1000)) * 100 - 100).toFixed(2));
    console.log(this.earnRate);
  }
}
