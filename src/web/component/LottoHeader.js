class LottoHeader extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <header>
        <h1>🎱 행운의 로또</h1>
      </header>
    `;
  }
}

customElements.define('lotto-header', LottoHeader);
