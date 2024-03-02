class LottoInput extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `

        `;
  }
}

customElements.define('lotto-input', LottoInput);
