import { Lotto } from './Lotto.js';

export class LottoGame {
  constructor() {
    this.moneyInput;
    this.lottoWallet = [];
  }

  insertMoney(moneyInput) {
    if (this.isInputValid(moneyInput)) {
      this.moneyInput = moneyInput;
    }
  }

  isInputValid(input) {
    if (!this.isMoneyPositive(input)) {
      alert('is money negative');
      throw new Error('negative error');
    }
    if (!this.isMoneyInteger(input)) {
      alert('is money not a integer');
      throw new Error('not a integer error');
    }
    return true;
  }

  isMoneyPositive(input) {
    return input > 0;
  }

  isMoneyInteger(input) {
    return Number.isInteger(input);
  }

  buyLotto() {
    for (let i = 0; i * 1000 < this.moneyInput; i++) {
      this.lottoWallet.push(new Lotto());
    }
  }
}
