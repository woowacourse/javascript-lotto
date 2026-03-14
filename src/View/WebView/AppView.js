class AppView {
  render() {
    const app = document.querySelector("#app");
    const html = `
      <div class="layout">
        <header class="header">
          <h1 class="logo">
            <a href="/">🎱 행운의 로또</a>
          </h1>
        </header>
        <main class="main">
          <section
            id="lotto-game-main"
            class="ui-content-box is-line width-fixed"
          >
            <div class="ui-title shape-main align-center">
              <h1 class="title">🎱 내 번호 당첨 확인 🎱</h1>
            </div>

            <!-- 금액 입력 -->
            <div class="ui-form-group">
              <div class="form-group-title">구입할 금액을 입력해주세요.</div>
              <div class="form-group-content">
                <div class="ui-input is-block" id="price">
                  <input placeholder="금액" />
                </div>
                <button class="ui-button variant-primary" id="buy-button">
                  구입
                </button>
              </div>
            </div>

            <div id="lotto-result-box"></div>

          </section>
        </main>
        <footer class="footer">
          <p class="copy-right">Copyright 2023. woowacourse</p>
        </footer>
      </div>
    `;

    app.innerHTML = html;
  }
  readPrice(handler) {
    const buyButton = document.querySelector("#buy-button");
    buyButton.addEventListener("click", () => {
      const priceInput = document.querySelector("#price input");
      const price = priceInput.value;

      handler(price);
    });
  }
}

export default AppView;
