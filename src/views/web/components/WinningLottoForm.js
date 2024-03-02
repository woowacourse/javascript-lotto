export const WINNING_LOTTO_EVENTS = {
  submit: 'winningLottoFormSubmit',
};

export const WINNINT_LOTTO_SELECTOR = "form[is='winning-lotto-form']";

export default class WinningLottoForm extends HTMLFormElement {
  #errorMessage;

  #winningNumbersInput;

  #bonusNumberInput;

  constructor() {
    super();

    const template = document.getElementById('template-winning-lotto-form');
    const content = template.content.cloneNode(true);
    this.appendChild(content);

    this.#errorMessage = this.querySelector('.err-msg');
    this.#winningNumbersInput = this.winningNumbers;
    this.#bonusNumberInput = this.bonusNumber;

    this.style.visibility = 'hidden';
  }

  connectedCallback() {
    this.addEventListener('submit', this.#handleSubmit.bind(this));
  }

  displayErrorMessage(message) {
    this.#errorMessage.innerHTML = message;
  }

  clearErrorMessage() {
    this.#errorMessage.innerHTML = '';
  }

  displayForm() {
    this.style.visibility = '';
  }

  // disableForm() {
  //   this.#winningNumbersInput.forEach((numberInput) => (numberInput.disabled = true));
  //   this.#bonusNumberInput.disabled = true;
  // }

  #handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(this);
    const winningNumbers = formData.getAll('winningNumbers');
    const bonusNumber = formData.getAll('bonusNumber');

    this.dispatchEvent(
      new CustomEvent(WINNING_LOTTO_EVENTS.submit, {
        detail: { winningNumbers, bonusNumber },
      }),
    );
  }
}
