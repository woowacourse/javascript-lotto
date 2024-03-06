import LottoStore from "../domains/LottoStore";
import WinningLotto from "../domains/WinningLotto";
import LottoResult from "../domains/LottoResult";
import Lotto from "../domains/Lotto";
import LottoPurchaseForm from "../dom/views/LottoPurcaseForm";
import WinningLottoForm from "../dom/views/WinningLottoForm";
import WinningResult from "../dom/views/WinningResult";
import { LOTTO_RULES } from "../constants/lotto";

export default class LottoController {
  #lottos;

  constructor() {
    this.#lottos = null;
  }

  #isInstanceOfWinningLotto(winningLotto) {
    return winningLotto instanceof WinningLotto;
  }

  #renderPurchasedLotto() {
    LottoPurchaseForm.resetPurchaseForm();
    const lottoNumbers = this.#lottos.map((lotto) => lotto.getNumbers());
    LottoPurchaseForm.renderPurchasedLottos(lottoNumbers);
  }

  #configWinningLotto(winningNumbers, bonusNumber) {
    try {
      const winninbNumberArray = winningNumbers.map((winningNumber) =>
        Number(winningNumber)
      );
      return new WinningLotto(
        new Lotto(winninbNumberArray),
        Number(bonusNumber)
      );
    } catch (error) {
      alert(error.message);
      WinningLottoForm.resetWinningLottoForm();
      WinningLottoForm.focusFirstWinningLottoInput();
    }
  }

  purchaseLottos(purchaseAmount) {
    try {
      this.#lottos = LottoStore.purchaseLottos(purchaseAmount);
      this.#renderPurchasedLotto();
      WinningLottoForm.renderWinningLottoForm();
    } catch (error) {
      alert(error.message);
      LottoPurchaseForm.resetPurchaseForm();
      LottoPurchaseForm.focusPurchaseInput();
    }
  }

  renderWinningResult(winningNumbers, bonusNumber) {
    const winningLotto = this.#configWinningLotto(winningNumbers, bonusNumber);
    if (!this.#isInstanceOfWinningLotto(winningLotto)) return;

    const lottoResult = new LottoResult();
    lottoResult.generateResult(this.#lottos, winningLotto);
    const lottoRankBoard = lottoResult.getRankBoard();
    const returnRate = lottoResult.calculateReturnRate(
      this.#lottos.length * LOTTO_RULES.price
    );

    WinningResult.renderWinningResult(lottoRankBoard, returnRate);
  }

  closeWinningResultModal() {
    WinningResult.closeResultModal();
  }

  restartLottoGame() {
    this.closeWinningResultModal();
    LottoPurchaseForm.resetPurchaseForm();
    LottoPurchaseForm.focusPurchaseInput();
    LottoPurchaseForm.removePurchasedLottos();
    WinningLottoForm.resetWinningLottoForm();
    WinningLottoForm.hideWinningLottoForm();
  }
}
