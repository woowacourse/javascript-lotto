import { $$, $ } from '../utils/dom';
import { isValidMoneyInput, isDuplicatedLottos } from '../controller/validator';
import { ERROR_MESSAGE } from '../controller/constants';
import { maxLengthHandler } from '../utils/maxLengthHandler';

class LottoView {
  constructor(modalView, controller) {
    this.controller = controller;
    this.modalView = modalView;
    this.moneyInputValue = 0;

    this.purchaseForm = $('.purchase-form');
    this.winningNumbersForm = $('.winning-numbers-form');
    this.lottoGrid = $('.lotto-grid');
    this.purchaseStatusContainer = $('.purchase-status-container', this.result);
    this.result = $$('.result');
    this.moneyInput = $('.money-input', this.purchaseForm);
    this.purchaseButton = $('.purchase-button', this.purchaseForm);
    this.winningNumbers = $$('.winning-numbers', this.winningNumbersForm);
    this.cmToggle = $('.cm-toggle', this.result[0]);

    this.purchaseForm.addEventListener('submit', this.purchaseHandler);
    this.cmToggle.addEventListener('click', this.toggleNumberDetail);
    this.winningNumbersForm.addEventListener('submit', this.winningLottoHandler);
    this.winningNumbers.forEach(input => input.addEventListener('input', maxLengthHandler));
    $('.restart', this.modalView.modalContainer).addEventListener('click', () => this.controller.resetLotto(this));
  }

  showLottoImage = (lottos) => {
    const template = lottos.map(lotto => 
      `<div class="lotto-img">
        🎟️<span class="lotto-number-detail d-none">${lotto.lottoNumbers.join(', ')}</span>
      </div>`).join('');
      this.lottoGrid.insertAdjacentHTML('beforeend', template);                        
  };
  
  showNumberOfLottos = (length) => {
    const template = `<span class="inform-text">총 ${length}개를 구매하였습니다.</span>`;
    this.purchaseStatusContainer.insertAdjacentHTML('afterbegin', template);
  };
  
  showResultElements = () => {
    this.result.forEach(element => element.classList.remove('d-none'));
  };
  
  deactivateForm = () => {
    this.moneyInput.setAttribute('disabled', true);
    this.purchaseButton.setAttribute('disabled', true);
  };
  
  showResult = (lottos) => {
    this.deactivateForm();
    this.showResultElements();
    this.showNumberOfLottos(lottos.length);
    this.showLottoImage(lottos);
  };
  
  purchaseHandler = e => {
    e.preventDefault();
    const moneyInput = Number(this.moneyInput.value);
  
    if (!isValidMoneyInput(moneyInput)) {
      alert(ERROR_MESSAGE.INVALID_MONEY_INPUT);
      return;
    }
    this.moneyInputValue = moneyInput;
    this.controller.generateLottos(this.moneyInputValue);
    this.showResult(this.controller.lottos);
  };

  winningLottoHandler = e => {
    e.preventDefault();
    const winningNumbers = Array.prototype.slice.call(this.winningNumbers).map(input => input.value);

    if (isDuplicatedLottos(winningNumbers)) {
      alert(ERROR_MESSAGE.DUPLICATED_WINNING_INPUT);
      return;
    }
    const { winnerStatistic, earningsRate } = this.controller.generateResult(winningNumbers, this.moneyInputValue);
    this.modalView.showWinnerModal(winnerStatistic, earningsRate);
  };
  
  hideResultElements = () => {
    this.lottoGrid.innerHTML = '';
    this.lottoGrid.classList.remove('lotto-grid-detail');
    this.result.forEach(element => element.classList.add('d-none'));
    $('.inform-text', this.purchaseStatusContainer).remove();
    this.cmToggle.checked = false;
  };
  
  activateForm = () => {
    this.moneyInput.removeAttribute('disabled');
    this.purchaseButton.removeAttribute('disabled');
  };
  
  resetInputValue = () => {
    this.moneyInput.value = '';
    this.winningNumbers.forEach(element => element.value = '');
  };
  
  resetView = () => {
    this.modalView.closeModal();
    this.hideResultElements();
    this.activateForm();
    this.resetInputValue();
  };
  
  toggleNumberDetail = () => {
    this.lottoGrid.classList.toggle('lotto-grid-detail');
    $$('.lotto-number-detail', this.lottoGrid).forEach(element => {
      element.classList.toggle('d-none');
    });
  };
}

export default LottoView;
