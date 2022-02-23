import MoneyInputView from '../views/MoneyInputView.js';
import LottoListView from '../views/LottoListView.js';
import LottosModel from '../models/LottosModel.js';

import { $ } from '../utils/element-manager.js';
import { SELECTOR } from '../constants/selector.js';

export default class LottoController {
  #MoneyInputView = new MoneyInputView($(`.${SELECTOR.CLASS.LOTTO_MONEY_SECTION}`));
  #LottoListView = new LottoListView($(`.${SELECTOR.CLASS.LOTTO_LIST_SECTION}`));
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
