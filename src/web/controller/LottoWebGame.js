import { $, $$ } from '../utils/dom';
import * as LottoGameValidator from '../../domain/validator';
import convertToNumeric from '../../util/convertToNumeric';
import LottoMachine from '../../domain/LottoMachine';
import WinningLotto from '../../domain/WinningLotto';
import LottoComparer from '../../domain/LottoComparer';
import { convertToWinningNumber } from '../../domain/util';
import ModalController from './ModalController';
import calculateProfitRate from '../../domain/calculateProfitRate';
import renderLottoListSection from '../view/LottoListView';
import renderLottoResultModal from '../view/LottoResultModalView';

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
    $('#winning-lotto-form-section').classList.add('hidden');
  }

  bindEventListeners() {
    $('.purchase-amount-form').addEventListener('submit', this.onSubmitPurchaseButton.bind(this));
    $('#result-button').addEventListener('click', this.onClickResultButton.bind(this));
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

  onClickResultButton() {
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
