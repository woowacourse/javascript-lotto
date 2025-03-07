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
    this.#initMainContainer();
  }

  render() {
    this.app.innerHTML = `
    <lotto-header></lotto-header>
    <main-container class="container"></main-container>
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
    const mainContainer = this.app.querySelector(CUSTOM_ELEMENTS.mainContainer);
    mainContainer.reset();
  }

  #initMainContainer() {
    const mainContainer = this.app.querySelector(CUSTOM_ELEMENTS.mainContainer);
    mainContainer.initComponents();
  }
}

export default View;
