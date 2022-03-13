import { $$, $ } from '../utils/dom';
import { closeModal } from './modalView';
import { isValidMoneyInput, isDuplicatedLottos } from '../controller/validator';
import { ERROR_MESSAGE } from '../controller/constants';
import LottoController from '../controller/LottoController';
import { maxLengthHandler } from '../utils/maxLengthHandler';

class LottoView {
  constructor() {
    this.controller = new LottoController();
    this.moneyInput = 0;
    $('.purchase-form').addEventListener('submit', this.purchaseHandler);
    $('.cm-toggle').addEventListener('click', this.toggleNumberDetail);
    $('.winning-numbers-form').addEventListener('submit', this.winningLottoHandler);
    $$('.winning-numbers').forEach(input => input.addEventListener('input', maxLengthHandler));
    $('.modal-closer').addEventListener('click', closeModal);
    $('.restart').addEventListener('click', () => this.controller.resetLotto(this));
  }

  showLottoImage = (lottos) => {
    const template = lottos.map(lotto => 
      `<div class="lotto-img">
        🎟️<span class="lotto-number-detail d-none">${lotto.lottoNumbers.join(', ')}</span>
      </div>`).join('');
    $('.lotto-grid').insertAdjacentHTML('beforeend', template);                        
  };
  
  showNumberOfLottos = (length) => {
    const template = `<span class="inform-text">총 ${length}개를 구매하였습니다.</span>`;
    $('.purchase-status-container').insertAdjacentHTML('afterbegin', template);
  };
  
  showResultElements = () => {
    $$('.result').forEach(element => element.classList.remove('d-none'));
  };
  
  deactivateForm = () => {
    $('.money-input').setAttribute('disabled', true);
    $('.purchase-button').setAttribute('disabled', true);
  };
  
  showResult = (lottos) => {
    this.deactivateForm();
    this.showResultElements();
    this.showNumberOfLottos(lottos.length);
    this.showLottoImage(lottos);
  };
  
  purchaseHandler = e => {
    e.preventDefault();
    const moneyInput = Number($('.money-input').value);
  
    if (!isValidMoneyInput(moneyInput)) {
      alert(ERROR_MESSAGE.INVALID_MONEY_INPUT);
      return;
    }
    this.moneyInput = moneyInput;
    this.controller.generateLottos(this.moneyInput);
    this.showResult(this.controller.lottos);
  };

  winningLottoHandler = e => {
    e.preventDefault();
    const winningNumbers = Array.prototype.slice.call($$('.winning-numbers')).map(input => input.value);

    if (isDuplicatedLottos(winningNumbers)) {
      alert(ERROR_MESSAGE.DUPLICATED_WINNING_INPUT);
      return;
    }
    this.controller.generateResult(winningNumbers, this.moneyInput);
    
  };
  
  hideResultElements = () => {
    const lottoGrid = $('.lotto-grid');
    lottoGrid.innerHTML = '';
    lottoGrid.classList.remove('lotto-grid-detail');
    $$('.result').forEach(element => element.classList.add('d-none'));
    $('.inform-text').remove();
    $('.cm-toggle').checked = false;
  };
  
  activateForm = () => {
    $('.money-input').removeAttribute('disabled');
    $('.purchase-button').removeAttribute('disabled');
  };
  
  resetInputValue = () => {
    $('.money-input').value = '';
    $$('.winning-numbers').forEach(element => element.value = '');
  };
  
  resetView = () => {
    closeModal();
    this.hideResultElements();
    this.activateForm();
    this.resetInputValue();
  };
  
  toggleNumberDetail = () => {
    const lottoGrid = $('.lotto-grid');
  
    lottoGrid.classList.toggle('lotto-grid-detail');
    $$('.lotto-number-detail').forEach(element => {
      element.classList.toggle('d-none');
    });
  };
}

export default LottoView;
