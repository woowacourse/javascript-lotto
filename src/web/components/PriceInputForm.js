import { createEl } from '../utils/dom.js';

export default class PriceInputForm {
  #onSubmit;
  #elements;

  constructor({ onSubmit }) {
    this.#onSubmit = onSubmit;
  }

  mount(container) {
    const { section, form, input, errorMessage } = this.#createElement();
    this.#elements = { section, input, errorMessage };
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

  clearInput() {
    this.#elements.input.value = '';
  }

  #handleSubmit(event) {
    event.preventDefault();
    this.#onSubmit(this.#elements.input.value);
  }

  #createElement() {
    const input = createEl('input', { type: 'text', className: 'purchase-section__input', placeholder: '구입할 금액을 입력해주세요.' });
    const errorMessage = createEl('p', { className: 'error-message' });
    const form = createEl('form', { className: 'purchase-section__form' },
      input,
      createEl('button', { type: 'submit', className: 'purchase-section__btn caption' }, '구입'),
    );
    const section = createEl('div', { className: 'purchase-section' }, form, errorMessage);
    return { section, form, input, errorMessage };
  }
}
