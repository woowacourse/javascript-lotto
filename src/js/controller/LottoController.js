import MoneyInputView from '../views/MoneyInputView.js';
import LottoListView from '../views/LottoListView.js';
import LottosModel from '../models/LottosModel.js';

import { $ } from '../utils/element-manager.js';

export default class LottoController {
  #MoneyInputView = new MoneyInputView($('.lotto-money-section'));
  #LottoListView = new LottoListView($('.lotto-list-section'));
  #LottosModel = new LottosModel();

  constructor() {
    this.bindEvents();
  }

  bindEvents() {
    this.#MoneyInputView.bindMoneyInputSubmit(this.handleMoneyInputSubmit.bind(this));
    this.#LottoListView.bindLottoNumberToggle();
  }

  handleMoneyInputSubmit({ moneyInput }) {
    try {
      this.#LottosModel.buy(moneyInput);
      this.#LottoListView.renderLottoList(this.#LottosModel.list);
    } catch (error) {
      alert(error);
    }
  }
}
