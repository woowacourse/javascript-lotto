import MoneyInputView from '../views/MoneyInputView';
import LottoListView from '../views/LottoListView';
import WinningNumberInputView from '../views/WinningNumberInputView';
import LottosModel from '../models/LottosModel';
import LottoResultView from '../views/LottoResultView';
import ModalView from '../views/ModalView';

import {
  checkValidMoneyInput,
  checkValidWinningNumberList,
  getWinningNumberErrorIndexList,
} from '../utils/Lotto/validator';
import { SELECTOR } from '../constants/selector';

import '../../css/Lotto.scss';

export default class LottoController {
  #View = {
    MoneyInput: new MoneyInputView(SELECTOR.LOTTO_MONEY_SECTION),
    LottoList: new LottoListView(SELECTOR.LOTTO_LIST_SECTION),
    WinningNumberInput: new WinningNumberInputView(SELECTOR.LOTTO_WINNING_NUMBER_SECTION),
    LottoResultModal: new ModalView(SELECTOR.LOTTO_RESULT_MODAL),
    LottoResultContent: new LottoResultView(SELECTOR.LOTTO_RESULT_MODAL),
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
      this.#View.MoneyInput.renderMoneyInputError(error.message);
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
      const errorInputIndex = getWinningNumberErrorIndexList(winningNumberList);
      this.#View.WinningNumberInput.renderWinningNumberInputError(error.message, errorInputIndex);
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
