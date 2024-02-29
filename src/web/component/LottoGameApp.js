class LottoGameApp extends HTMLElement {
  connectedCallback() {
    this.#render();
  }

  #render() {
    this.innerHTML = `
      <lotto-header></lotto-header>
      <main>
        <div id="lotto-game">
          <h1>🎱 내 번호 당첨 확인 🎱</h1>
          <purchase-form></purchase-form>
          <purchase-result></purchase-result>
        </div>
      </main>
      <lotto-footer></lotto-footer>
    `;
  }
}

customElements.define('lotto-game-app', LottoGameApp);
