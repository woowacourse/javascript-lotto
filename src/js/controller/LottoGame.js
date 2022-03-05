import Lotto from "../model/Lotto.js";
import LottoResult from "../model/LottoResult.js";
import PurchasedLottoView from "../views/PurchasedLottoView.js";
import PurchaseAmountView from "../views/PurchaseAmountView.js";
import WinningNumberView from "../views/WinningNumberView.js";
import LottoResultView from "../views/lottoResultView.js";
import { AMOUNT, LOTTO_RANKING_REWARD } from "../utils/constants.js";
import { calculateProfitRate } from "../utils/general.js";

export default class LottoGame {
  constructor() {
    this.lottoModel = new Lotto();
    this.lottoResultModel = new LottoResult();
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
      type: "click",
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
    this.purchasedLottoView.render(this.lottoModel.getLottoList());
  }

  handleWinningNumbers(winningNumbers) {
    this.lottoModel
      .getLottoList()
      .forEach((lotto) => this.lottoResultModel.compareWinningNumbers(lotto, winningNumbers));

    const lottoResult = this.lottoResultModel.getlottoResult();
    this.calculateTotalProfitRate(lottoResult);
  }

  calculateTotalProfitRate(lottoResult) {
    const totalProfit = Object.keys(lottoResult).reduce(
      (total, ranking) => total + lottoResult[ranking] * LOTTO_RANKING_REWARD[ranking],
      0,
    );
    const usedAmount = this.lottoModel.getLottoList().length * AMOUNT.UNIT;
    const totalProfitRate = calculateProfitRate(totalProfit, usedAmount);
    this.lottoResultView.renderResultModal(lottoResult, totalProfitRate);
  }

  restartGame() {
    this.lottoModel.resetLottoList();
    this.lottoResultModel.resetLottoResult();
    this.purchaseAmountView.resetPurchaseValue();
    this.winningNumberView.resetWinningNumbersValue();
    this.purchaseAmountView.enableForm();
    this.purchasedLottoView.resetPurchasedLotto();
    this.purchasedLottoView.renderPurchaseInfomation(this.lottoModel.getLottoList.length);
  }
}
