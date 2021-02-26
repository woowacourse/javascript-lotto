export default class Input {
  constructor({
    id,
    classes = [],
    type = 'text',
    placeholder = '',
    disabled = false,
  }) {
    this.id = id;
    this.classes = classes;
    this.type = type;
    this.placeholder = placeholder;
    this.disabled = disabled;
  }

  mainTemplate() {
    return `<input ${this.id ? `id=${this.id}` : ''} type=${
      this.type
    } class="${this.classes.join(' ')}" placeholder="${this.placeholder}" />`;
  }
}
