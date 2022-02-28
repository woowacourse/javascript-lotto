import Lotto from "../model/Lotto.js";
import LottoGameView from "../views/LottoGameView.js";
import { $ } from "../utils/dom.js";
import { AMOUNT, ELEMENTS } from "../utils/constants.js";
import { validatePurchaseAmount } from "../utils/validation.js";

export default class LottoGame {
  constructor() {
    this.lottoGameModel = new Lotto();
    this.lottoGameView = new LottoGameView();
    $(".purchase-form").addEventListener("submit", this.onSubmitPurchase.bind(this));
  }

  onSubmitPurchase(e) {
    e.preventDefault();

    const purchaseAmount = Number(ELEMENTS.PURCHASE_INPUT.value);
    try {
      validatePurchaseAmount(purchaseAmount);
      const lottoCount = Math.floor(purchaseAmount / AMOUNT.UNIT);
      this.lottoGameModel.generateLottoTicket(lottoCount);
      this.lottoGameView.handlePurchasedLotto(this.lottoGameModel.getLottoList(), lottoCount);
    } catch (error) {
      alert(error);
    }
  }
}
