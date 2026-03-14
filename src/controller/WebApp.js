import { LOTTO_PRICE } from "../constants/lottoInfo";
import LottoController from "./LottoController";
import Validator from "../utils/Validator";
import PurchaseView from "../view/web/PurchaseView";
import WinningInputView from "../view/web/WinningInputView";
import LottoResultView from "../view/web/LottoResultView";

class WebApp {
  #lottoController;

  constructor() {
    this.#lottoController = new LottoController();
  }

  bindEvents() {
    PurchaseView.onPurchase((price) => this.#handlePurchase(price));

    WinningInputView.onSubmitNumbers((winningNumbers, bonusNumber) =>
      this.#handleWinningResult(winningNumbers, bonusNumber),
    );

    LottoResultView.onClose();
    LottoResultView.onRestart(() => this.#restartGame());
  }

  #handlePurchase(purchasedPrice) {
    try {
      Validator.validatePrice(purchasedPrice);

      const lottoCount = purchasedPrice / LOTTO_PRICE;
      const purchasedLottos = this.#lottoController.issueLottos(lottoCount);

      PurchaseView.renderPurchasedLottos(purchasedLottos);
      WinningInputView.renderInput();
    } catch (error) {
      alert(error.message);
    }
  }

  #handleWinningResult(winningNumbers, bonusNumber) {
    try {
      Validator.validateWinningNums(winningNumbers);
      Validator.validateBonusNum(winningNumbers, bonusNumber);

      this.#lottoController.updateWinningResult(winningNumbers, bonusNumber);
      const { rankCount, profitRate } =
        this.#lottoController.getWinningResult();

      LottoResultView.renderResult(rankCount, profitRate);
    } catch (error) {
      alert(error.message);
    }
  }

  #restartGame() {
    PurchaseView.reset();
    WinningInputView.reset();
  }
}

export default WebApp;
