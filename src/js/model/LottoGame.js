import { Lotto } from './Lotto.js';
import { CONDITIONS, WINNINGS } from '../constants/constants.js';

export class LottoGame {
  constructor() {
    this.moneyInput;
    this.lottoWallet = [];
    this.winningNumbers;
    this.bonusNumber;
    this.winningStatus = new Array(5).fill(0);
    this.yield;
  }

  insertMoney = (moneyInput) => (this.moneyInput = moneyInput);

  buyLotto = () => {
    this.lottoWallet = [
      ...this.lottoWallet,
      ...[...new Array(Math.floor(this.moneyInput / CONDITIONS.LOTTO_PRICE))].map(
        () => new Lotto()
      ),
    ];
  };

  getWinningNumbers(winningNumbers, bonusNumber) {
    this.winningNumbers = new Set(Object.values(winningNumbers));
    this.bonusNumber = bonusNumber;
  }

  compareLottos() {
    this.winningStatus.fill(0);
    this.lottoWallet.forEach((lotto, idx) => {
      let count = 0;
      let bonus = 0;
      lotto.numbers.forEach((number, idx) => {
        this.winningNumbers.has(number) ? count++ : undefined;
        this.bonusNumber === number ? bonus++ : undefined;
      });
      this.#getLottoStatus(count, bonus);
    });
  }

  #getLottoStatus(count, bonus) {
    switch (count) {
      case 3:
        this.winningStatus[0]++;
        break;
      case 4:
        this.winningStatus[1]++;
        break;
      case 5:
        if (count === 5 && bonus === 0) {
          this.winningStatus[2]++;
          break;
        }
        this.winningStatus[3]++;
        break;
      case 6:
        this.winningStatus[4]++;
        break;
    }
  }

  calculateYield() {
    let winAmount = 0;
    this.winningStatus.forEach((winStatus, idx) => {
      winAmount += winStatus * WINNINGS[`${5 - idx}-place`];
    });
    this.yield = (winAmount / (this.lottoWallet.length * CONDITIONS.LOTTO_PRICE)) * 100;
    this.yield = Number(this.yield.toFixed(2));
  }

  reStartLottos() {
    this.moneyInput = 0;
    this.bonusNumber = 0;
    this.yield = 0;
    this.lottoWallet = [];
    this.winningNumbers = new Set();
    this.winningStatus = new Array(5).fill(0);
  }
}
