import LottoMachine from '../../domain/LottoMachine';
import WinningLotto from '../../domain/WinningLotto';
import LottoComparer from '../../domain/LottoComparer';
import calculateProfitRate from '../../domain/calculateProfitRate';
import * as LottoGameValidator from '../../domain/validator';
import { convertToWinningNumber } from '../../domain/utils';

import ModalController from './ModalController';
import {
  createLottoListSection,
  createWinningNumberFormSection,
  lottoGameTitle,
  purchaseAmountSection,
  createResultModal,
} from '../view';
import { $, $$ } from '../utils/dom';

import convertToNumeric from '../../utils/convertToNumeric';

class LottoGame {
  #container;

  #modal;

  #lottos;

  constructor(container) {
    this.#container = container;
    this.#modal = new ModalController($('#modal-background'), $('#modal'));

    this.init();
  }

  init() {
    this.#container.innerHTML = lottoGameTitle + purchaseAmountSection;
    this.bindEventListeners();
  }

  reset() {
    this.#modal.reset();
    this.init();
  }

  bindEventListeners() {
    $('#purchase-amount-form').addEventListener('submit', this.onSubmitPurchaseButton.bind(this));
  }

  onSubmitPurchaseButton(e) {
    e.preventDefault();

    try {
      const purchaseAmount = convertToNumeric($('#purchase-amount-input').value);
      LottoGameValidator.validatePurchaseAmount(purchaseAmount);

      this.processPurchaseLottos(purchaseAmount);
      $('#purchase-button').setAttribute('disabled', true);
    } catch (error) {
      alert(error.message);
      $('#purchase-amount-input').value = '';
    }
  }

  processPurchaseLottos(purchaseAmount) {
    const lottoMachine = new LottoMachine(purchaseAmount);
    this.#lottos = lottoMachine.issueLottos();

    this.#container.innerHTML +=
      createLottoListSection(this.#lottos) + createWinningNumberFormSection();
    $('#winning-numbers-form').addEventListener(
      'submit',
      this.onSubmitWinningNumbersForm.bind(this),
    );
  }

  onSubmitWinningNumbersForm(e) {
    e.preventDefault();

    try {
      const winningNumber = convertToWinningNumber(
        [...$$('.js-winning-number-input')].map((element) => element.value),
      );
      LottoGameValidator.validateWinningNumber(winningNumber);
      const bonusNumber = convertToNumeric($('.js-bonus-number-input').value);
      LottoGameValidator.validateBonusNumber(bonusNumber, winningNumber);

      this.processLottoComparison(winningNumber, bonusNumber);
    } catch (error) {
      alert(error.message);
    }
  }

  processLottoComparison(winningNumber, bonusNumber) {
    const winningLotto = new WinningLotto(winningNumber, bonusNumber);
    const ranking = new LottoComparer(winningLotto, this.#lottos).getRanking();
    const profitRate = calculateProfitRate(ranking, this.#lottos.length);

    this.#modal.show(createResultModal(ranking, profitRate));
    $('#restart-button').addEventListener('click', this.onClickRestartButton.bind(this));
  }

  onClickRestartButton() {
    this.reset();
  }
}

export default LottoGame;
