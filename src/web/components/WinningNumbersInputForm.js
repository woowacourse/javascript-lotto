import { createEl } from '../utils/dom.js';

export default class WinningNumbersInputForm {
  #onSubmit;
  #elements;

  constructor({ onSubmit }) {
    this.#onSubmit = onSubmit;
  }

  mount(container) {
    const { section, form, winningInputs, bonusInput, errorMessage } = this.#createElement();
    this.#elements = { section, winningInputs, bonusInput, errorMessage };
    form.addEventListener('submit', this.#handleSubmit.bind(this));
    container.appendChild(section);
  }

  unmount() {
    this.#elements.section.remove();
  }

  showError(message) {
    this.#elements.errorMessage.textContent = message;
  }

  clearError() {
    this.#elements.errorMessage.textContent = '';
  }

  #handleSubmit(event) {
    event.preventDefault();
    const { winningInputs, bonusInput } = this.#elements;
    const winningNumbers = winningInputs.map((input) => Number(input.value));
    const bonusNumber = Number(bonusInput.value);
    this.#onSubmit({ winningNumbers, bonusNumber });
  }

  #createNumberInputs(count) {
    return Array.from({ length: count }, () =>
      createEl('input', { type: 'text', className: 'number-input', maxLength: '2' }),
    );
  }

  #createNumberGroup(labelText, inputs) {
    return createEl('fieldset', { className: 'number-group' },
      createEl('legend', { className: 'number-group__label' }, labelText),
      createEl('div', { className: 'number-group__fields' }, ...inputs),
    );
  }

  #createElement() {
    const winningInputs = this.#createNumberInputs(6);
    const [bonusInput] = this.#createNumberInputs(1);

    const winningGroup = this.#createNumberGroup('당첨 번호', winningInputs);
    const bonusGroup = this.#createNumberGroup('보너스 번호', [bonusInput]);
    bonusGroup.classList.add('number-group--bonus');

    const errorMessage = createEl('p', { className: 'error-message' });
    const form = createEl('form', { className: 'winning-section__form' },
      createEl('div', { className: 'winning-section__inputs' }, winningGroup, bonusGroup),
      createEl('button', { type: 'submit', className: 'result-btn caption' }, '결과 확인하기'),
      errorMessage,
    );
    const section = createEl('div', { className: 'winning-section' },
      createEl('p', {}, '지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.'),
      form,
    );
    return { section, form, winningInputs, bonusInput, errorMessage };
  }
}
