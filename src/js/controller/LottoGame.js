import Lotto from "../model/Lotto.js";
import WinningNumbers from "../model/WinningNumbers.js";
import PurchasedLottoView from "../views/PurchasedLottoView.js";
import PurchaseAmountView from "../views/PurchaseAmountView.js";
import WinningNumberView from "../views/WinningNumberView.js";
import LottoResultView from "../views/lottoResultView.js";

export default class LottoGame {
  constructor() {
    this.lottoModel = new Lotto();
    this.purchaseAmountView = new PurchaseAmountView();
    this.purchasedLottoView = new PurchasedLottoView();
    this.winningNumbersModel = new WinningNumbers();
    this.winningNumberView = new WinningNumberView();
    this.lottoResultView = new LottoResultView();

    this.purchaseAmountView.addHandler({
      type: "submit",
      handler: this.onSubmitPurchaseAmount.bind(this),
    });
    this.winningNumberView.addHandler({
      type: "click",
      handler: this.onClickResultButton.bind(this),
    });
  }

  onSubmitPurchaseAmount(purchaseAmount) {
    const lottoCount = this.lottoModel.convertLottoCount(purchaseAmount);
    this.lottoModel.generateLottoTicket(lottoCount);
    this.purchasedLottoView.handlePurchasedLotto(lottoCount, this.lottoModel.getLottoList());
  }

  onClickResultButton(winningNumbers) {
    this.winningNumbersModel.setWinningNumbers(winningNumbers);
    this.lottoModel
      .getLottoList()
      .forEach((lotto) => this.winningNumbersModel.compareWinningNumbers(lotto));
    this.lottoResultView.renderResultModal();
  }
}
