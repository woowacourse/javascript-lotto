import { Lotto } from './Lotto.js';
import { CONDITIONS, WINNING_PRICE } from '../constants/constants.js';

export class LottoGame {
  constructor() {
    this.moneyInput;
    this.lottoWallet = [];
    this.winningNumbers = [];
    this.bonusNumber;
    this.result = new Map([
      ['matchSix', 0],
      ['matchFiveBonus', 0],
      ['matchFive', 0],
      ['matchFour', 0],
      ['matchThree', 0],
      ['matchUnderThree', 0],
    ]);
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
    this.result.set('matchSix', count);

    count = result.filter((element) => 5.5 === element).length;
    this.result.set('matchFiveBonus', count);

    count = result.filter((element) => 5 === element).length;
    this.result.set('matchFive', count);

    count = result.filter((element) => 4 === element).length;
    this.result.set('matchFour', count);

    count = result.filter((element) => 3 === element).length;
    this.result.set('matchThree', count);

    count = result.filter((element) => 3 > element).length;
    this.result.set('matchUnderThree', count);
  }

  calculateEarnRate() {
    let earnMoney = 0;
    earnMoney += this.result.get('matchSix') * WINNING_PRICE.MATCH_SIX;
    earnMoney += this.result.get('matchFiveBonus') * WINNING_PRICE.MATCH_FIVE_BONUS;
    earnMoney += this.result.get('matchFive') * WINNING_PRICE.MATCH_FIVE;
    earnMoney += this.result.get('matchFour') * WINNING_PRICE.MATCH_FOUR;
    earnMoney += this.result.get('matchThree') * WINNING_PRICE.MATCH_THREE;

    this.earnRate = Number(((earnMoney / (this.lottoWallet.length * CONDITIONS.LOTTO_PRICE)) * 100 - 100).toFixed(2));
  }
}
