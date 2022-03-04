import MoneyInputView from '../views/MoneyInputView';
import LottoListView from '../views/LottoListView';
import WinningNumberInputView from '../views/WinningNumberInputView';
import LottosModel from '../models/LottosModel';
import LottoResultView from '../views/LottoResultView';
import ModalView from '../views/ModalView';

import { checkValidMoneyInput, checkValidWinningNumberList } from '../utils/Lotto/validator';
import { SELECTOR } from '../constants/selector';

import '../../css/Lotto.scss';

export default class LottoController {
  #View = {
    MoneyInput: new MoneyInputView(`.${SELECTOR.CLASS.LOTTO_MONEY_SECTION}`),
    LottoList: new LottoListView(`.${SELECTOR.CLASS.LOTTO_LIST_SECTION}`),
    WinningNumberInput: new WinningNumberInputView(
      `.${SELECTOR.CLASS.LOTTO_WINNING_NUMBER_SECTION}`
    ),
    LottoResultModal: new ModalView('#lotto-result-modal'),
    LottoResultContent: new LottoResultView('#lotto-result-modal'),
  };

  #LottosModel = new LottosModel();

  constructor() {
    this.bindEvents();
  }

  bindEvents() {
    this.#View.MoneyInput.bindMoneyInputSubmit(this.handleMoneyInputSubmit.bind(this));
    this.#View.LottoList.bindLottoNumberToggle();
    this.#View.WinningNumberInput.bindWinningNumberInputSubmit(
      this.handleWinningNumberInputSubmit.bind(this)
    );
    this.#View.LottoResultContent.bindLottoRetryButton(this.handleLottoRetry.bind(this));
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

  handleWinningNumberInputSubmit({ winningNumberList }) {
    try {
      checkValidWinningNumberList(winningNumberList);
      this.#View.LottoResultModal.show();
      this.#LottosModel.winningNumberList = winningNumberList;

      const { winningRankCountList, playerLottoYield } = this.#LottosModel.result;
      this.#View.LottoResultContent.renderLottoResultList(winningRankCountList);
      this.#View.LottoResultContent.renderLottoResultYield(playerLottoYield);
    } catch (error) {
      alert(error.message);
    }
  }

  handleLottoRetry() {
    this.#LottosModel.init();

    this.#View.MoneyInput.init();
    this.#View.LottoList.init();
    this.#View.WinningNumberInput.init();
    this.#View.LottoResultModal.hide();
    this.#View.LottoResultContent.init();
  }
}
