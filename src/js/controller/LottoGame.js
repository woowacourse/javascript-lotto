import LottoModel from "../model/LottoModel.js";
import LottoResultModel from "../model/LottoResultModel.js";
import PurchasedLottoView from "../views/PurchasedLottoView.js";
import PurchaseAmountView from "../views/PurchaseAmountView.js";
import WinningNumberView from "../views/WinningNumberView.js";
import LottoResultView from "../views/lottoResultView.js";
import { AMOUNT } from "../utils/constants.js";

export default class LottoGame {
  constructor() {
    this.lottoModel = new LottoModel();
    this.lottoResultModel = new LottoResultModel();
    this.purchaseAmountView = new PurchaseAmountView();
    this.purchasedLottoView = new PurchasedLottoView();
    this.winningNumberView = new WinningNumberView();
    this.lottoResultView = new LottoResultView();

    this.purchaseAmountView.addHandler({
      type: "submit",
      handler: this.handlePurchaseAmount.bind(this),
    });
    this.purchasedLottoView.addHandler({
      type: "click",
      handler: this.handlePurchasedLotto.bind(this),
    });
    this.winningNumberView.addHandler({
      type: "submit",
      handler: this.handleWinningNumbers.bind(this),
    });
    this.lottoResultView.addHandler({
      type: "click",
      handler: this.restartGame.bind(this),
    });
  }

  handlePurchaseAmount(purchaseAmount) {
    const lottoCount = this.lottoModel.convertLottoCount(purchaseAmount);
    this.lottoModel.generateLottoTicket(lottoCount);
    this.purchasedLottoView.handlePurchasedLotto(lottoCount);
  }

  handlePurchasedLotto() {
    this.purchasedLottoView.toggleLottoNumbers(this.lottoModel.getLottoList());
  }

  handleWinningNumbers(winningNumbers) {
    this.lottoModel
      .getLottoList()
      .forEach((lotto) => this.lottoResultModel.compareWinningNumbers(lotto, winningNumbers));
    const lottoResult = this.lottoResultModel.getlottoResult();
    const usedAmount = this.lottoModel.getLottoList().length * AMOUNT.UNIT;
    const totalProfitRate = this.lottoResultModel.calculateTotalProfitRate(lottoResult, usedAmount);
    this.lottoResultView.renderResultModal(lottoResult, totalProfitRate);
  }

  restartGame() {
    this.lottoModel.resetLottoList();
    this.lottoResultModel.resetLottoResult();
    this.purchaseAmountView.resetPurchaseValue();
    this.winningNumberView.resetWinningNumbersValue();
    this.purchaseAmountView.enableForm();
    this.purchasedLottoView.resetPurchasedLotto();
    this.purchasedLottoView.renderPurchasedInfomation(this.lottoModel.getLottoList.length);
  }
}
