import LottoService from "../Service/LottoService.js";
import LottoView from "../webView/LottoView/LottoView.js";
import ModalView from "../webView/ModalView/ModalView.js";
import PurchaseView from "../webView/PurchaseView/PurchaseView.js";
import UserLottoView from "../webView/UserLottoView/UserLottoView.js";

export default class WebController {
  constructor() {
    this.service = new LottoService();

    this.purchaseView = new PurchaseView();
    this.lottoView = new LottoView();
    this.userLottoView = new UserLottoView();
    this.modalView = new ModalView();
  }

  init() {
    this.purchaseView.bindPurchase(this.handlePurchase.bind(this));
    this.userLottoView.bindCheckResult(this.handleResult.bind(this));
    this.modalView.bindClose(this.handleCloseModal.bind(this));
    this.modalView.bindRestart(this.handleRestart.bind(this));
  }

  handlePurchase(amount) {
    try {
      const lottos = this.service.purchaseLottos(amount);

      this.lottoView.renderLottos(lottos);
      this.lottoView.open();
      this.purchaseView.clearError();
    } catch (error) {
      this.purchaseView.showError(error.message);
    }
  }

  handleResult({ winningNumbers, bonusNumber }) {
    try {
      const { statistics, yieldRate } = this.service.calculateResult(
        winningNumbers,
        bonusNumber
      );

      this.userLottoView.clearError();
      this.modalView.renderStatistics(statistics);
      this.modalView.renderRate(yieldRate);
      this.modalView.open();
    } catch (error) {
      this.userLottoView.showError(error.message);
    }
  }

  handleCloseModal() {
    this.modalView.close();
  }

  handleRestart() {
    this.modalView.close();
    this.purchaseView.clearInput();
    this.userLottoView.clearInputs();
    this.lottoView.close();
  }
}
