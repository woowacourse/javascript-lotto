import Lotto from "../model/Lotto.js";
import LottoGameView from "../views/LottoGameView.js";

export default class LottoGame {
  constructor() {
    this.lottoModel = new Lotto();
    this.lottoGameView = new LottoGameView();
    this.lottoGameView.addHandler({
      type: "submit",
      handler: this.purchaseAmountHandler.bind(this),
    });
  }

  purchaseAmountHandler(purchaseAmount) {
    const lottoCount = this.lottoModel.convertLottoCount(purchaseAmount);
    this.lottoModel.generateLottoTicket(lottoCount);
    this.lottoGameView.handlePurchasedLotto(lottoCount, this.lottoModel.getLottoList());
  }
}
