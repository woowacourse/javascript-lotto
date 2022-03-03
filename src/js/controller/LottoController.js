import MoneyInputView from '../views/MoneyInputView';
import LottoListView from '../views/LottoListView';
import LottosModel from '../models/LottosModel';
import WinningLottoCounter from '../models/WinningLottoCounter';

import { $ } from '../utils/element-manager';
import { SELECTOR } from '../constants/selector';
import { checkValidMoneyInput, checkValidWinningNumberInput } from '../utils/Lotto/validator';
import WinningNumberInputView from '../views/WinningNumberInputView';
import ResultModalView from '../views/ResultModalView';

export default class LottoController {
  #MoneyInputView = new MoneyInputView($(`.${SELECTOR.CLASS.LOTTO_MONEY_SECTION}`));
  #LottoListView = new LottoListView($(`.${SELECTOR.CLASS.LOTTO_LIST_SECTION}`));
  #WinningNumberInputView = new WinningNumberInputView(
    $(`.${SELECTOR.CLASS.WINNING_NUMBER_SECTION}`)
  );
  #ResultModalView = new ResultModalView($('.modal'));
  #LottosModel = new LottosModel();
  #WinningLottoCounter = new WinningLottoCounter();

  constructor() {
    this.bindEvents();
  }

  bindEvents() {
    this.#MoneyInputView.bindMoneyInputSubmit(this.handleMoneyInputSubmit.bind(this));
    this.#WinningNumberInputView.bindWinningNumberInputSubmit(
      this.handleWinningNumberSubmit.bind(this)
    );
    this.#ResultModalView.bindResetLottos(this.handleResetLottos.bind(this));
  }

  handleMoneyInputSubmit({ money }) {
    try {
      checkValidMoneyInput(money);
      this.#LottosModel.chargedMoney = Number(money);
      this.#LottosModel.buy(money);
      this.#LottoListView.renderLottoListSection();
      this.#WinningNumberInputView.renderWinningNumbersInput();
      this.#LottoListView.renderLottoListItems(this.#LottosModel.list);
    } catch (error) {
      alert(error);
    }
  }

  handleWinningNumberSubmit({ winningNumbers, bonusNumber }) {
    try {
      checkValidWinningNumberInput(winningNumbers.concat(bonusNumber).filter((number) => number));
      this.#WinningLottoCounter.setWinningLotto({ winningNumbers, bonusNumber });
      this.#WinningLottoCounter.calculateWinningCounts(this.#LottosModel.lottos);
      this.#WinningLottoCounter.calculateProfitRate(this.#LottosModel.chargedMoney);
      this.#ResultModalView.showResultModal();
      this.#ResultModalView.renderHitCount(this.#WinningLottoCounter.winningCounts);
      this.#ResultModalView.renderProfitRage(
        this.#WinningLottoCounter.calculateProfitRate(this.#LottosModel.chargedMoney)
      );
    } catch (error) {
      alert(error);
    }
  }

  handleResetLottos() {
    [
      this.#LottosModel,
      this.#WinningLottoCounter,
      this.#LottoListView,
      this.#WinningNumberInputView,
      this.#MoneyInputView,
    ].forEach((instance) => {
      instance.reset();
    });
  }
}
