import MoneyInputView from '../views/MoneyInputView';
import LottoListView from '../views/LottoListView';
import LottosModel from '../models/LottosModel';

import { checkValidMoneyInput } from '../utils/Lotto/validator';
import { SELECTOR } from '../constants/selector';

import '../../css/Lotto.scss';

export default class LottoController {
  #MoneyInputView = new MoneyInputView(`.${SELECTOR.CLASS.LOTTO_MONEY_SECTION}`);
  #LottoListView = new LottoListView(`.${SELECTOR.CLASS.LOTTO_LIST_SECTION}`);
  #LottosModel = new LottosModel();

  constructor() {
    this.bindEvents();
  }

  bindEvents() {
    this.#MoneyInputView.bindMoneyInputSubmit(this.handleMoneyInputSubmit.bind(this));
    this.#LottoListView.bindLottoNumberToggle();
  }

  handleMoneyInputSubmit({ moneyInputValue: money }) {
    try {
      checkValidMoneyInput(money);
      this.#LottosModel.buy(money);

      this.#MoneyInputView.init();
      this.#LottoListView.showLottoList();
      this.#LottoListView.renderLottoList(this.#LottosModel.list);
    } catch (error) {
      alert(error.message);
    }
  }
}
