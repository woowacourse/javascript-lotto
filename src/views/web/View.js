import "../../components/header/Header.js";
import "../../components/footer/Footer.js";
import "../../components/lotto-purchase/LottoPurchase.js";
import "../../components/issued-lotto/IssuedLotto.js";
import "../../components/winning-lotto/WinningLotto.js";
import "../../components/lotto-result/LottoResult.js";
import "../../components/main-container/MainContainer.js";
import { CUSTOM_ELEMENTS } from "../../constants/customElements.js";
import { renderElement } from "../../utils/domUtils.js";

class View {
  constructor() {
    this.app = document.querySelector("#app");
    this.render();
    this.#cacheElements();
    this.#initMainContainer();
  }

  #cacheElements() {
    this.mainContainer = this.app.querySelector(CUSTOM_ELEMENTS.mainContainer);
    this.issuedLotto = this.app.querySelector(CUSTOM_ELEMENTS.issuedLotto);
    this.winningLotto = this.app.querySelector(CUSTOM_ELEMENTS.winningLotto);
    this.lottoResult = this.app.querySelector(CUSTOM_ELEMENTS.lottoResult);
  }

  render() {
    this.app.innerHTML = `
    <lotto-header></lotto-header>
    <main-container class="container"></main-container>
    <lotto-footer></lotto-footer>
    `;
  }

  updateIssuedLotto(lottos) {
    this.issuedLotto.updateLottos(lottos);
    renderElement(this.issuedLotto);
  }

  initWinningLotto() {
    this.winningLotto.initWinningLotto();
    renderElement(this.winningLotto);
  }

  showResult(statistics, profitRatio) {
    this.lottoResult.showResult(statistics, profitRatio);
  }

  restartLotto() {
    this.mainContainer.reset();
    this.#cacheElements();
  }

  #initMainContainer() {
    this.mainContainer.initComponents();
  }
}

export default View;
