import MoneyInputView from '../views/MoneyInputView';
import LottoListView from '../views/LottoListView';
import LottosModel from '../models/LottosModel';
import WinningLottoCounter from '../models/WinningLottoCounter';

import { $ } from '../utils/element-manager';
import { SELECTOR } from '../constants/selector';
import { checkValidMoneyInput, checkValidWinningNumberInput } from '../utils/Lotto/validator';
import WinningNumberInputView from '../views/WinningNumberInputView';

export default class LottoController {
  #MoneyInputView = new MoneyInputView($(`.${SELECTOR.CLASS.LOTTO_MONEY_SECTION}`));
  #LottoListView = new LottoListView($(`.${SELECTOR.CLASS.LOTTO_LIST_SECTION}`));
  #LottosModel = new LottosModel();
  #WinningNumberInputView = new WinningNumberInputView(
    $(`.${SELECTOR.CLASS.WINNING_NUMBER_SECTION}`)
  );
  #WinningLottoCounter = new WinningLottoCounter();

  constructor() {
    this.bindEvents();
  }

  bindEvents() {
    this.#MoneyInputView.bindMoneyInputSubmit(this.handleMoneyInputSubmit.bind(this));
    this.#WinningNumberInputView.bindWinningNumberInputSubmit(
      this.handleWinningNumberSubmit.bind(this)
    );
    document.querySelector('#app').addEventListener('click', (e) => {
      if (
        e.target.classList.contains('close-modal-button') ||
        e.target.classList.contains('reset-button') ||
        e.target.classList.contains('modal')
      ) {
        document.querySelector('.modal').style.display = 'none';
      }
    });
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

  handleWinningNumberSubmit({ winningNumbers, bonusNumber }) {
    try {
      checkValidWinningNumberInput(winningNumbers.concat(bonusNumber).filter((number) => number));
      document.querySelector('.modal').style.display = 'block';
      this.#WinningLottoCounter.setWinningLotto({ winningNumbers, bonusNumber });
      this.#WinningLottoCounter.calculateWinningCounts(this.#LottosModel.lottos);
      Object.values(this.#WinningLottoCounter.winningCounts).forEach((count, index) => {
        document.getElementById(`winning-count-${index + 1}th`).textContent = `${count} 개`;
      });
    } catch (error) {
      alert(error);
    }
  }
}
