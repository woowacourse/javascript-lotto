import MoneyInputView from '../views/MoneyInputView';
import LottoListView from '../views/LottoListView';
import WinningNumberInputView from '../views/WinningNumberInputView';
import LottosModel from '../models/LottosModel';
import LottoResultView from '../views/LottoResultView';
import ModalView from '../views/ModalView';

import { checkValidMoneyInput } from '../utils/Lotto/validator';
import { SELECTOR } from '../constants/selector';

import '../../css/Lotto.scss';

export default class LottoController {
  #View = {
    MoneyInput: new MoneyInputView(`.${SELECTOR.CLASS.LOTTO_MONEY_SECTION}`),
    LottoList: new LottoListView(`.${SELECTOR.CLASS.LOTTO_LIST_SECTION}`),
    WinningNumberInput: new WinningNumberInputView(
      `.${SELECTOR.CLASS.LOTTO_WINNING_NUMBER_SECTION}`
    ),
    LottoModal: new ModalView('#lotto-result-modal'),
    LottoResult: new LottoResultView('#lotto-result-modal'),
  };

  #LottosModel = new LottosModel();

  constructor() {
    this.bindEvents();
  }

  bindEvents() {
    this.#View.MoneyInput.bindInputSubmit(this.handleMoneyInputSubmit.bind(this));
    this.#View.LottoList.bindLottoNumberToggle();
  }

  handleMoneyInputSubmit({ moneyInputValue: money }) {
    try {
      checkValidMoneyInput(money);
      this.#LottosModel.buy(money);

      this.#View.MoneyInput.init();
      this.#View.LottoList.showContainer();
      this.#View.LottoList.renderLottoList(this.#LottosModel.list);
      this.#View.WinningNumberInput.showContainer();
    } catch (error) {
      alert(error.message);
    }
  }
}
