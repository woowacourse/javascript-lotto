import { $, $$ } from '../utils/util';

const CLASS_DISPLAY_NONE = 'display-none';

export default class WinningNumberSubmitFormView {
  constructor(app) {
    this.app = app;
    this.winningResultSection = $('#winning-result-section', this.app);
    this.winningNumberForm = $('#winning-number-form', this.winningResultSection);
    this.winningNumberInputs = $$('.winning-number-input', this.winningNumberForm);
    this.winningNumberSubmitButton = $('button', this.winningNumberForm);
    
    this.bindEvent();
  }

  bindEvent() {
    this.winningNumberInputs.forEach((inputElement, index) => {
      inputElement.addEventListener('keyup', this.onTypeWinningNumber.bind(this, index));
    })
    this.winningNumberForm.addEventListener('submit', this.onSubmitWinningNumber.bind(this));
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
      detail: { winningNumberInputValues }
    });
    this.app.dispatchEvent(winningNumberSubmitEvent);
  }

  initialize() {
    this.winningNumberInputs.forEach((inputElement) => { inputElement.value = ''; });
    this.changeWinningResultSectionVisibility();
  }

  updateOnPurchase(tickets) {
    if (tickets.length !== 0 && !this.isWinningResultSectionVisible())
      this.changeWinningResultSectionVisibility();
  }

  isWinningResultSectionVisible() {
    return !(this.winningResultSection.classList.contains(CLASS_DISPLAY_NONE));
  }

  changeWinningResultSectionVisibility() {
    return this.winningResultSection.classList.contains(CLASS_DISPLAY_NONE)
      ? this.winningResultSection.classList.remove(CLASS_DISPLAY_NONE)
      : this.winningResultSection.classList.add(CLASS_DISPLAY_NONE);
  }

}
