import Input from './Input.js';

export default class LottoNumbersInput {
  constructor({ id, classes = [], type = 'number', placeholder = '' }) {
    this.id = id;
    this.classes = classes;
    this.type = type;
    this.placeholder = placeholder;
  }

  getTemplate() {
    return `<div class="lotto-number-input-wrapper">
    ${new Input({ type: this.type, classes: this.classes })
      .getTemplate()
      .repeat(6)}
      </div>`;
  }
}
