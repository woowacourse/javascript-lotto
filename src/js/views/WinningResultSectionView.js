import { $, $$ } from '../utils/util';
import { MATCH_RESULT_INDEX, PRIZE_MONEY } from '../constants/constants';

const CLASS_DISPLAY_NONE = 'display-none';

export default class WinningResultSectionView {
  constructor() {
    this.winningResultSection = $('#winning-result-section');
    this.winningNumberForm = $('#winning-number-form');
    this.winningNumberInputs = $$('.winning-number-input', this.winningNumberForm);
    this.winningNumberSubmitButton = $('button', this.winningNumberForm);
    this.resultModalArea = $('#result-modal-area', this.winningResultSection);
    this.resultModalCloseButton = $('#result-modal-close-button', this.resultModalArea);
    this.restartButton = $('#restart-button', this.resultModalArea);
    
    this.bindEvent();
  }

  bindEvent() {
    this.winningNumberInputs.forEach((inputElement, index) => {
      inputElement.addEventListener('keyup', this.onTypeWinningNumber.bind(this, index));
    })
    this.winningNumberForm.addEventListener('submit', this.onSubmitWinningNumber.bind(this));
    this.resultModalCloseButton.addEventListener('click', this.closeWinningResultModal.bind(this));
    this.restartButton.addEventListener('click', this.onClickRestartButton.bind(this));
  }

  onTypeWinningNumber(inputIndex, event) {
    const regex = /[^0-9]/;
    event.target.value = event.target.value.replace(regex, '');
    if (event.target.value.length >= 2) 
      event.target.value = event.target.value.slice(0, 2);
    if (event.target.value.length >= 2 && inputIndex !== this.winningNumberInputs.length - 1)
      this.winningNumberInputs[inputIndex + 1].focus();
    if (event.target.value.length >= 2 && inputIndex === this.winningNumberInputs.length - 1)
      this.winningNumberSubmitButton.focus();
  }

  onSubmitWinningNumber(event) {
    event.preventDefault();
    const winningNumberInputValues = Array.from(this.winningNumberInputs)
      .map(numberInput => Number(numberInput.value)).filter(number => number !== 0);
    const winningNumberSubmitEvent = new CustomEvent('checkWinningResult', {
      detail: {
        winningNumberInputValues
      }
    });
    window.dispatchEvent(winningNumberSubmitEvent);
  }

  onClickRestartButton() {
    const restartEvent = new CustomEvent('restart', {});
    window.dispatchEvent(restartEvent);
  }

  initialize() {
    this.winningNumberInputs.forEach((inputElement) => { inputElement.value = ''; });
    this.hideWinningResultSection();
    this.closeWinningResultModal();
  }

  updateOnPurchase(tickets) {
    if (tickets.length !== 0 && !this.isWinningResultSectionVisible())
      this.showWinningResultSection();
  }

  updateOnCheckWinningResult(winningResult){
    this.updateWinningResultModal(winningResult);
    this.openWinningResultModal();
  }

  isWinningResultSectionVisible() {
    return !(this.winningResultSection.classList.contains(CLASS_DISPLAY_NONE));
  }

  showWinningResultSection() {
    this.winningResultSection.classList.remove(CLASS_DISPLAY_NONE);
  }

  hideWinningResultSection() {
    this.winningResultSection.classList.add(CLASS_DISPLAY_NONE);
  }

  openWinningResultModal() {
    this.resultModalArea.classList.remove(CLASS_DISPLAY_NONE);
  }

  closeWinningResultModal() {
    this.resultModalArea.classList.add(CLASS_DISPLAY_NONE);
  }

  updateWinningResultModal({ matchResult, profitRatio }) {
    $$('.match-result', this.resultModalArea).forEach((resultRow) => {
      $('.match-count', resultRow).innerText = `${matchResult[MATCH_RESULT_INDEX[resultRow.dataset.matchCount]]}개`;
      $('.prize-money', resultRow).innerText = PRIZE_MONEY[resultRow.dataset.matchCount].toLocaleString();
    })
    $('#profit-ratio', this.resultModalArea).innerText = Math.round(profitRatio);
  }
}
