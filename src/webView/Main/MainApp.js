const html = String.raw;

class MainApp extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = html`<div class="main-container">
      <div class="card-container">
        <div class="card-header">🎱 내 번호 당첨 확인 🎱</div>

        <div class="card-input-container">
          <label class="input-label" for="purchase-amount">
            구입할 금액을 입력해주세요.
          </label>
          <div class="input-container">
            <input class="input-line" id="purchase-amount" placeholder="금액" />
            <button class="input-button">구입</button>
          </div>
        </div>
      </div>
    </div>`;
  }
}

customElements.define("lotto-main", MainApp);
