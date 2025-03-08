import LottoGameManager from "./LottoGameManager.js";

class LottoGame {
  constructor(ui) {
    this.ui = ui;
    this.lottoGameManager = new LottoGameManager();
  }

  purchaseLotto(priceInput) {
    try {
      this.lottoGameManager.purchaseLotto(priceInput);

      this.ui.updateLottoUI(this.lottoGameManager.getLottos());
      this.ui.updatePurchaseUI(true);
      this.ui.disablePurchaseButton();
    } catch (error) {
      this.ui.updatePurchaseUI(false);
      this.ui.showErrorMessage(error.message);
    }
  }

  showWinningResult() {
    try {
      const { winningNumbers, bonusNumber } = this.getAndValidateWinningNumbers();

      this.lottoGameManager.setWinningNumbers(winningNumbers, bonusNumber);

      const { rankHistory, prizeRate } = this.lottoGameManager.getWinningResult();

      this.ui.updateWinningUI(rankHistory, prizeRate);
      this.ui.showResultModal();
      this.ui.resetWinningBonusInput();
    } catch (error) {
      this.ui.showErrorMessage(error.message);
    }
  }

  getAndValidateWinningNumbers() {
    const winningNumbersInput = this.ui.getWinningNumbers();
    this.checkWinningNumbersIsEmpty(winningNumbersInput);
    const winningNumbers = winningNumbersInput.map(Number);
    const bonusInput = this.ui.getBonusNumber();
    this.checkBonusNumberIsEmpty(bonusInput);
    const bonusNumber = Number(bonusInput);
    return { winningNumbers, bonusNumber };
  }

  checkWinningNumbersIsEmpty(value) {
    if (value.length < 1) {
      throw new Error('[ERROR] 당첨번호를 입력해 주세요.');
    }
  }

  checkBonusNumberIsEmpty(value) {
    if (value === '') {
      throw new Error('[ERROR] 보너스 번호를 입력해 주세요.');
    }
  }

  resetGame() {
    this.lottoGameManager.resetGame();
    this.ui.resetGameUI();
    this.ui.enablePurchaseButton();
    this.ui.closeResultModal();
  }
}

export default LottoGame;
