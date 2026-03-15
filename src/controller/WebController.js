import LottoService from "../service/LottoService.js";
import WebView from "../view/WebView.js";

export default class WebController {
  constructor() {
    this.lottoService = new LottoService();
    this.webView = new WebView();

    this.initEventListener();
  }

  initEventListener() {
    this.webView.bindPurchaseEvent(this.handlePuchase.bind(this));
    this.webView.bindWinningResultFormEvent(
      this.handleWinningResultForm.bind(this)
    );
    this.webView.initRestartEvent(() => {
      this.lottoService.reset();
    });
    this.webView.initModalEvent();
  }

  handlePuchase(purchaseAmount) {
    const lottos = this.lottoService.purchaseLottos(purchaseAmount);
    this.webView.renderPurchaseResult(lottos, lottos.length);
  }

  handleWinningResultForm(winningInputEls, bonusInputEl) {
    const result = this.lottoService.calculateWinningResult(
      Array.from(winningInputEls).map((el) => Number(el.value)),
      Number(bonusInputEl.value)
    );

    this.webView.openWinningModal(result);
  }
}
