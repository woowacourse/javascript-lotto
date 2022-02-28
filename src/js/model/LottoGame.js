import { Lotto } from './Lotto.js';
import { CONDITIONS } from '../constants/constants.js';

export class LottoGame {
  constructor() {
    this.moneyInput;
    this.lottoWallet = [];
  }

  insertMoney = (moneyInput) => (this.moneyInput = moneyInput);

  buyLotto = () => {
    this.lottoWallet = [
      ...this.lottoWallet,
      ...[
        ...new Array(Math.floor(this.moneyInput / CONDITIONS.LOTTO_PRICE)),
      ].map(() => new Lotto()),
    ];
  };
}
