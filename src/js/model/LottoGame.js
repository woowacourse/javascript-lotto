import { Lotto } from './Lotto.js';
import { CONDITIONS } from '../constants/constants.js';

export class LottoGame {
  constructor() {
    this.moneyInput;
    this.lottoWallet = [];
    this.winningNumbers = [];
    this.bonusNumber;
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
}
