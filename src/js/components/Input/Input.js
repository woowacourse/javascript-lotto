import { LOTTO } from '../../utils/constants.js';

export default class Input {
  constructor({
    id,
    classes = [],
    type = 'text',
    placeholder = '',
    disabled = false,
    maxlength = 10,
  }) {
    this.id = id;
    this.classes = classes;
    this.type = type;
    this.placeholder = placeholder;
    this.disabled = disabled;
    this.maxlength = maxlength;
  }

  getTemplate() {
    return `<input ${this.id ? `id=${this.id}` : ''} type=${
      this.type
    } class="${this.classes.join(' ')}" placeholder="${
      this.placeholder
    }" min="${LOTTO.MIN_NUM}" max="${LOTTO.MAX_NUM}" maxlength="${
      this.maxlength
    }"/>`;
  }
}
