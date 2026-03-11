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
    console.log(lottoCount)
    this.view.renderLottoCount(lottoCount);
    const lottoController = new LottoController(lottoCount);
    const purchasedLottos = lottoController.issueLottos();
    
    console.log(purchasedLottos)
  }
}

export default webApp;