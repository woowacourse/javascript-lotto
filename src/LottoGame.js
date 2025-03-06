import LottoGameManager from "./LottoGameManager.js";
import Winning from './Model/Winning.js';

class LottoGame {
  constructor(ui) {
    this.ui = ui;
    this.lottoGameManager = new LottoGameManager();
  }

  purchaseLotto(priceInput) {
    try {
      this.lottoGameManager.purchaseLotto(priceInput); // ✅ 검증이 LottoGameManager에서 수행됨

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
      const winning = new Winning(winningNumbers);
      winning.validateBonusNumber(bonusNumber);
      winning.setBonusNumber(bonusNumber);

      winning.calculateRank(this.lottoGameManager.getLottos());
      const prizeRate = winning.getCalculatedPrizeRate(this.lottoGameManager.getPrice());

      this.ui.updateWinningUI(winning.rankHistory, prizeRate);
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
