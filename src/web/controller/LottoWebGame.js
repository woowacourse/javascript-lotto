import { $, $$ } from '../utils/dom';
import * as LottoGameValidator from '../../domain/validator';
import convertToNumeric from '../../utils/convertToNumeric';
import LottoMachine from '../../domain/LottoMachine';
import WinningLotto from '../../domain/WinningLotto';
import LottoComparer from '../../domain/LottoComparer';
import { convertToWinningNumber } from '../../domain/utils';
import ModalController from './ModalController';
import calculateProfitRate from '../../domain/calculateProfitRate';

import renderLottoResultModal from '../view/LottoResultModalView';
import renderLottoListSection from '../view/LottoListView';

class LottoWebGame {
  #lottos;

  #modal;

  constructor() {
    this.#modal = new ModalController();

    this.bindEventListeners();
  }

  init() {
    this.#modal.reset();
    $('#purchase-amount-input').value = '';
    $('#purchase-lotto-list-section').innerHTML = '';
    $$('.winning-number-input').forEach((element) => {
      element.value = '';
    });
    $('#winning-lotto-form-section').classList.add('hidden');
  }

  bindEventListeners() {
    $('.purchase-amount-form').addEventListener('submit', this.onSubmitPurchaseButton.bind(this));
    $('#winning-numbers-form').addEventListener(
      'submit',
      this.onSubmitWinningNumbersForm.bind(this),
    );
    $('#modal').addEventListener('click', this.onClickRestartButton.bind(this));
  }

  onSubmitPurchaseButton(e) {
    e.preventDefault();

    try {
      const purchaseAmount = convertToNumeric($('#purchase-amount-input').value);
      LottoGameValidator.validatePurchaseAmount(purchaseAmount);

      const lottoMachine = new LottoMachine(purchaseAmount);
      this.#lottos = lottoMachine.issueLottos();

      renderLottoListSection(this.#lottos);
      $('#winning-lotto-form-section').classList.remove('hidden');
    } catch (error) {
      alert(error.message);
      $('#purchase-amount-input').value = '';
    }
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

      const winningLotto = new WinningLotto(winningNumber, bonusNumber);
      const ranking = new LottoComparer(winningLotto, this.#lottos).getRanking();
      const profitRate = calculateProfitRate(ranking, this.#lottos.length);

      this.#modal.show();
      renderLottoResultModal(ranking, profitRate);
    } catch (error) {
      alert(error.message);
    }
  }

  onClickRestartButton(e) {
    if (e.target.id === 'restart-button') {
      this.init();
    }
  }
}

export default LottoWebGame;
