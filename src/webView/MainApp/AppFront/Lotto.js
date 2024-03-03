import BaseComponent from '@webView/BaseComponent/BaseComponent';

class Lotto extends BaseComponent {
  #numbers;

  constructor(numbers) {
    super();
    this.#numbers = numbers;
  }
  render() {
    this.outerHTML = `<div class="lotto"><span class="lotto-mark lotto-body">🎟️</span> <span class="lotto-string text-lotto-body">${this.#getLottoString()}</span></div>`;
  }

  #getLottoString() {
    const padStart = (num) => (String(num).length == 1 ? `  ${String(num)}` : String(num));
    return this.#numbers.map(padStart).join(', ');
  }
}
customElements.define('lotto-element', Lotto);

export default Lotto;
