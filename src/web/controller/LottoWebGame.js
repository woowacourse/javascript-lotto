import { $, $$ } from '../utils/dom';
import * as LottoGameValidator from '../../domain/validator';
import convertToNumeric from '../../utils/convertToNumeric';
import LottoMachine from '../../domain/LottoMachine';
import WinningLotto from '../../domain/WinningLotto';
import LottoComparer from '../../domain/LottoComparer';
import { convertToWinningNumber } from '../../domain/utils';
import ModalController from './ModalController';
import calculateProfitRate from '../../domain/calculateProfitRate';

import {
  createLottoListSection,
  createWinningNumberFormSection,
  lottoGameTitle,
  purchaseAmountSection,
  createResultModal,
} from '../view';

class LottoWebGame {
  #container;

  #modal;

  #lottos;

  constructor() {
    this.#container = $('#lotto-game');
    this.#modal = new ModalController($('#modal-background'), $('#modal'));

    this.init();
  }

  init() {
    this.#container.innerHTML = lottoGameTitle + purchaseAmountSection;
    this.bindEventListeners();
  }

  reset() {
    this.#modal.reset();
    this.removeEventListeners();
    this.init();
  }

  bindEventListeners() {
    this.#container.addEventListener('submit', this.onSubmitWinningNumbersForm.bind(this));
    $('#purchase-amount-form').addEventListener('submit', this.onSubmitPurchaseButton.bind(this));
    this.#modal.getContainer().addEventListener('click', this.onClickRestartButton.bind(this));
  }

  removeEventListeners() {
    this.#container.removeEventListener('submit', this.onSubmitWinningNumbersForm.bind(this));
    $('#purchase-amount-form').removeEventListener(
      'submit',
      this.onSubmitPurchaseButton.bind(this),
    );
    this.#modal.getContainer().removeEventListener('click', this.onClickRestartButton.bind(this));
  }

  onSubmitPurchaseButton(e) {
    e.preventDefault();

    try {
      const purchaseAmount = convertToNumeric($('#purchase-amount-input').value);
      LottoGameValidator.validatePurchaseAmount(purchaseAmount);

      const lottoMachine = new LottoMachine(purchaseAmount);
      this.#lottos = lottoMachine.issueLottos();

      this.#container.innerHTML +=
        createLottoListSection(this.#lottos) + createWinningNumberFormSection(6, 1);
    } catch (error) {
      alert(error.message);
      $('#purchase-amount-input').value = '';
    }
  }

  onSubmitWinningNumbersForm(e) {
    e.preventDefault();

    if (e.target.id !== 'winning-numbers-form') return;

    try {
      const winningNumber = convertToWinningNumber(
        [...$$('.js-winning-number-input')].map((element) => element.value),
      );
      LottoGameValidator.validateWinningNumber(winningNumber);
      const bonusNumber = convertToNumeric($('.js-bonus-number-input').value);
      LottoGameValidator.validateBonusNumber(bonusNumber, winningNumber);

      const winningLotto = new WinningLotto(winningNumber, bonusNumber);
      const ranking = new LottoComparer(winningLotto, this.#lottos).getRanking();
      const profitRate = calculateProfitRate(ranking, this.#lottos.length);

      this.#modal.show(createResultModal(ranking, profitRate));
    } catch (error) {
      alert(error.message);
    }
  }

  onClickRestartButton(e) {
    if (e.target.id === 'restart-button') {
      this.reset();
    }
  }
}

export default LottoWebGame;
