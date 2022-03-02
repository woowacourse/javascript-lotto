import MoneyInputView from '../views/MoneyInputView';
import LottoListView from '../views/LottoListView';
import WinningNumberInputView from '../views/WinningNumberInputView';
import LottosModel from '../models/LottosModel';

import { checkValidMoneyInput } from '../utils/Lotto/validator';
import { SELECTOR } from '../constants/selector';

import '../../css/Lotto.scss';

export default class LottoController {
  #MoneyInputView = new MoneyInputView(`.${SELECTOR.CLASS.LOTTO_MONEY_SECTION}`);
  #LottoListView = new LottoListView(`.${SELECTOR.CLASS.LOTTO_LIST_SECTION}`);
  #LottosModel = new LottosModel();
  #WinningNumberInputView = new WinningNumberInputView(
    `.${SELECTOR.CLASS.LOTTO_WINNING_NUMBER_SECTION}`
  );

  constructor() {
    this.bindEvents();
  }

  bindEvents() {
    this.#MoneyInputView.bindInputSubmit(this.handleMoneyInputSubmit.bind(this));
    this.#LottoListView.bindLottoNumberToggle();
  }

  handleMoneyInputSubmit({ moneyInputValue: money }) {
    try {
      checkValidMoneyInput(money);
      this.#LottosModel.buy(money);

      this.#MoneyInputView.init();
      this.#LottoListView.showContainer();
      this.#WinningNumberInputView.showContainer();
      this.#LottoListView.renderLottoList(this.#LottosModel.list);
    } catch (error) {
      alert(error.message);
    }
  }
}
