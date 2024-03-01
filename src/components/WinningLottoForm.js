export const EVENTS = {
  winningLottoFormSubmit: 'winningLottoFormSubmit',
};

export const WINNINT_LOTTO_SELECTOR = "form[is='winning-lotto-form']";

export default class WinningLottoForm extends HTMLFormElement {
  #winningNumbersInput;

  #bonusNumberInput;

  constructor() {
    super();

    const template = document.getElementById('template-winning-lotto-form');
    const content = template.content.cloneNode(true);
    this.appendChild(content);

    this.#winningNumbersInput = this.querySelectorAll('.lotto-number-input[name="winning-numbers');
    this.#bonusNumberInput = this.querySelector('.lotto-number-input[name="bonus-number');
  }

  connectedCallback() {
    this.addEventListener('submit', this.#handleSubmit.bind(this));
  }

  #handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(this);
    const winningNumbers = formData.getAll('winning-numbers');
    const bonusNumber = formData.getAll('bonus-number');

    this.dispatchEvent(
      new CustomEvent(EVENTS.winningLottoFormSubmit, {
        detail: { winningNumbers, bonusNumber },
      }),
    );
  }
}
