import LottoController from "./LottoController.js";
import WebView from "../view/WebView.js";
import Validator from "../utils/Validator.js";

class webApp {
  constructor() {
    this.view = new WebView();
  }

  init() {
    this.view.$purchaseForm.addEventListener("submit", (e) => {
      e.preventDefault(); 
      this.#handlePurchase();
    });
  }

  #handlePurchase() {
    const purchasedPrice = Number(this.view.getPurchaseAmount());
    
    const lottoCount = purchasedPrice / 1000;

    this.view.renderLottoCount(lottoCount);
    const lottoController = new LottoController(lottoCount);
    const purchasedLottos = lottoController.issueLottos();

    this.view.renderLottosContainer(purchasedLottos);
    
  }
}

export default webApp;