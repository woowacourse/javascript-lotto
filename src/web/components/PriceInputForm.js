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
    const section = document.createElement('div');
    section.className = 'purchase-section';

    const form = document.createElement('form');
    form.className = 'purchase-section__form';

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'purchase-section__input';
    input.placeholder = '구입할 금액을 입력해주세요.';

    const button = document.createElement('button');
    button.type = 'submit';
    button.className = 'purchase-section__btn caption';
    button.textContent = '구입';

    const errorMessage = document.createElement('p');
    errorMessage.className = 'error-message';

    form.append(input, button);
    section.append(form, errorMessage);
    return { section, form, input, errorMessage };
  }
}
