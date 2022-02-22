import { Lotto } from './Lotto.js';
import { validator } from '../utils.js';
import { CONDITIONS } from '../constants/constants.js';

export class LottoGame {
  constructor() {
    this.moneyInput;
    this.lottoWallet = [];
  }

  insertMoney(moneyInput) {
    if (validator.isInputValid(moneyInput)) {
      this.moneyInput = moneyInput;
    }
  }

  buyLotto() {
    for (let i = 0; i * CONDITIONS.LOTTO_PRICE < this.moneyInput; i++) {
      this.lottoWallet.push(new Lotto());
    }
  }
}
