export default class Button {
  constructor({
    id,
    classes = [],
    type = 'button',
    text = '',
    disabled = false,
  }) {
    this.id = id;
    this.classes = classes;
    this.type = type;
    this.text = text;
    this.disabled = disabled;
  }

  mainTemplate() {
    return `<button id="${this.id}" type="${
      this.type
    }" class="${this.classes.join(' ')}" ${this.disabled ? 'disabled' : ''}>${
      this.text
    }</button>`;
  }
}
