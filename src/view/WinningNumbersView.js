export default class WinningNumbersView {
  constructor() {
    this.$winningLottoSection = document.querySelector('#winning-lotto-section');
    this.$winningLottoForm = document.querySelector('#winning-lotto-form');
    this.$winningNumbersInputs = document.querySelectorAll('.winning-numbers-inputs');
    this.$bonusNumberInput = document.querySelector('#bonus-number-input');
    this.$resultButton = document.querySelector('#check-result-button');
    this.connectEvents();
  }

  connectEvents() {
    this.$winningLottoForm.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  handleSubmit(e) {
    e.preventDefault();

    const winningLotto = {
      winningNumbers: Array.from(this.$winningNumbersInputs).map((input) => input.valueAsNumber),
      bonusNumber: this.$bonusNumberInput.valueAsNumber,
    };

    const event = new CustomEvent('check', { detail: winningLotto });

    this.$winningLottoForm.dispatchEvent(event);
  }

  showWinningNumbers() {
    this.$winningLottoSection.classList.replace('hidden', 'show');
  }

  hideWinningNumbers() {
    this.$winningLottoSection.classList.replace('show', 'hidden');
  }

  reloadView() {
    this.$winningNumbersInputs.forEach((numberInput) => (numberInput.value = ''));
    this.$bonusNumberInput.value = '';
  }

  disableResultButton() {
    this.$resultButton.setAttribute('disabled', true);
  }

  enableResultButton() {
    this.$resultButton.removeAttribute('disabled');
  }
}
