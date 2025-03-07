import "../../components/header/Header.js";
import "../../components/footer/Footer.js";
import "../../components/lotto-purchase/LottoPurchase.js";
import "../../components/issued-lotto/IssuedLotto.js";
import "../../components/winning-lotto/WinningLotto.js";
import "../../components/lotto-result/LottoResult.js";
import { CUSTOM_ELEMENTS } from "../../constants/customElements.js";
import { renderElement, hideElement } from "../../utils/domUtils.js";

class View {
  constructor() {
    this.app = document.querySelector("#app");
    this.render();
    this.#initComponent();
  }

  render() {
    this.app.innerHTML = `
    <lotto-header></lotto-header>
    <div class="container">
      <main>
        <lotto-purchase></lotto-purchase>
        <issued-lotto></issued-lotto>
        <winning-lotto></winning-lotto>
        <lotto-result></lotto-result>
      </main>
    </div>
    <lotto-footer></lotto-footer>
    `;
  }

  updateIssuedLotto(lottos) {
    const issuedLotto = this.app.querySelector(CUSTOM_ELEMENTS.issuedLotto);
    issuedLotto.updateLottos(lottos);
    renderElement(issuedLotto);
  }

  initWinningLotto() {
    const winningLotto = this.app.querySelector(CUSTOM_ELEMENTS.winningLotto);
    winningLotto.initWinningLotto();
    renderElement(winningLotto);
  }

  showResult(statistics, profitRatio) {
    const lottoResult = this.app.querySelector(CUSTOM_ELEMENTS.lottoResult);
    lottoResult.showResult(statistics, profitRatio);
  }

  restartLotto() {
    this.render();
    this.#initComponent();
  }

  #initComponent() {
    const issuedLotto = this.app.querySelector(CUSTOM_ELEMENTS.issuedLotto);
    const winningLotto = this.app.querySelector(CUSTOM_ELEMENTS.winningLotto);

    hideElement(issuedLotto);
    hideElement(winningLotto);
  }
}

export default View;
