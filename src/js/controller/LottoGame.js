import Lotto from "../model/Lotto.js";
import LottoGameView from "../views/LottoGameView.js";
import { AMOUNT } from "../utils/constants.js";

export default class LottoGame {
  constructor() {
    this.lottoGameModel = new Lotto();
    this.lottoGameView = new LottoGameView();
    this.lottoGameView.addHandler({
      type: "submit",
      handler: this.handlePurchaseAmount.bind(this),
    });
  }

  handlePurchaseAmount(purchaseAmount) {
    const lottoCount = Math.floor(purchaseAmount / AMOUNT.UNIT);
    this.lottoGameModel.generateLottoTicket(lottoCount);
    this.lottoGameView.handlePurchasedLotto(this.lottoGameModel.getLottoList(), lottoCount);
  }
}
