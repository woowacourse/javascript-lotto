import MoneyInputView from '../views/MoneyInputView';
import LottoListView from '../views/LottoListView';
import LottosModel from '../models/LottosModel';

import { $ } from '../utils/element-manager';
import { SELECTOR } from '../constants/selector';
import { checkValidMoneyInput } from '../utils/Lotto/validator';
import WinningNumberInputView from '../views/WinningNumberInputView';

export default class LottoController {
  #MoneyInputView = new MoneyInputView($(`.${SELECTOR.CLASS.LOTTO_MONEY_SECTION}`));
  #LottoListView = new LottoListView($(`.${SELECTOR.CLASS.LOTTO_LIST_SECTION}`));
  #LottosModel = new LottosModel();
  #WinningNumberInputView = new WinningNumberInputView(
    $(`.${SELECTOR.CLASS.WINNING_NUMBER_SECTION}`)
  );

  constructor() {
    this.bindEvents();
  }

  bindEvents() {
    this.#MoneyInputView.bindMoneyInputSubmit(this.handleMoneyInputSubmit.bind(this));
    this.#WinningNumberInputView.bindWinningNumberInputSubmit(
      this.handleWinningNumberSubmit.bind(this)
    );
  }

  handleMoneyInputSubmit({ money }) {
    try {
      checkValidMoneyInput(money);
      this.#LottosModel.buy(money);
      this.#LottoListView.showLottoList();
      this.#WinningNumberInputView.showWinningNumbers();
      this.#LottoListView.renderLottoList(this.#LottosModel.list);
    } catch (error) {
      alert(error);
    }
  }

  handleWinningNumberSubmit(numbers) {
    console.log(numbers);
  }
}
