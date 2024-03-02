import BaseComponent from '../BaseComponent/BaseComponent';

class Lotto extends BaseComponent {
  #numbers;

  constructor(numbers) {
    super();
    this.#numbers = numbers;
  }
  render() {
    const padStart = (num) => (String(num).length == 1 ? `  ${String(num)}` : String(num));
    this.outerHTML = `<div>🎟️ ${this.#numbers.map(padStart).join(', ')}</div>`;
  }

  setEvent() {}
}
customElements.define('lotto-element', Lotto);

export default Lotto;
