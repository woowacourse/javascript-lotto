import "../../components/header/Header.js";
import "../../components/footer/Footer.js";
import "../../components/lotto-purchase/LottoPurchase.js";
import "../../components/issued-lotto/IssuedLotto.js";
import "../../components/winning-lotto/WinningLotto.js";
import "../../components/lotto-result/LottoResult.js";
import { CUSTOM_ELEMENTS } from "../../constants/customElements.js";

class View {
  constructor() {
    this.app = document.querySelector("#app");
    this.render();
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
  }

  initWinningLotto() {
    const winningLotto = this.app.querySelector(CUSTOM_ELEMENTS.winningLotto);
    winningLotto.initWinningLotto();
  }

  showResult(statistics, profitRatio) {
    const lottoResult = this.app.querySelector(CUSTOM_ELEMENTS.lottoResult);
    lottoResult.showResult(statistics, profitRatio);
  }
}

export default View;
