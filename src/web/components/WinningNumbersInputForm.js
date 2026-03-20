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
    return Array.from({ length: count }, () => {
      const input = document.createElement('input');
      input.type = 'text';
      input.className = 'number-input';
      input.maxLength = 2;
      return input;
    });
  }

  #createNumberGroup(labelText, inputs) {
    const fieldset = document.createElement('fieldset');
    fieldset.className = 'number-group';

    const legend = document.createElement('legend');
    legend.className = 'number-group__label';
    legend.textContent = labelText;

    const fields = document.createElement('div');
    fields.className = 'number-group__fields';
    fields.append(...inputs);

    fieldset.append(legend, fields);
    return fieldset;
  }

  #createElement() {
    const section = document.createElement('div');
    section.className = 'winning-section';

    const inputsRow = document.createElement('div');
    inputsRow.className = 'winning-section__inputs';

    const winningInputs = this.#createNumberInputs(6);
    const [bonusInput] = this.#createNumberInputs(1);

    const winningGroup = this.#createNumberGroup('당첨 번호', winningInputs);
    const bonusGroup = this.#createNumberGroup('보너스 번호', [bonusInput]);
    bonusGroup.classList.add('number-group--bonus');

    const form = document.createElement('form');
    form.className = 'winning-section__form';

    const button = document.createElement('button');
    button.type = 'submit';
    button.className = 'result-btn caption';
    button.textContent = '결과 확인하기';

    const errorMessage = document.createElement('p');
    errorMessage.className = 'error-message';

    const description = document.createElement('p');
    description.textContent = '지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.';

    inputsRow.append(winningGroup, bonusGroup);
    form.append(inputsRow, button, errorMessage);
    section.append(description, form);
    return { section, form, winningInputs, bonusInput, errorMessage };
  }
}
