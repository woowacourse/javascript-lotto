import Validate from "./Model/Validate.js";
import LottoMachine from "./Model/LottoMachine.js";
import Winning from './Model/Winning';

class LottoGame {
  constructor(ui) {
    this.ui = ui;
    this.lottoMachine = new LottoMachine();
    this.price = 0;
    this.lottos = [];
  }

  purchaseLotto(priceInput) {
    try {
      Validate.validatePrice(priceInput);
      this.price = priceInput;
      this.lottos = this.lottoMachine.generateLotto(this.price);

      this.ui.updateLottoUI(this.lottos);
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
      const winning = new Winning(winningNumbers, bonusNumber);
      winning.calculateRank(this.lottos);
      const prizeRate = winning.getCalculatedPrizeRate(this.price);

      this.ui.updateWinningUI(winning.rankHistory, prizeRate);
      this.ui.showResultModal();
      this.ui.resetWinningBonusInput();
    } catch (error) {
      this.ui.showErrorMessage(error.message);
    }
  }

  getAndValidateWinningNumbers() {
    const winningNumbersInput = this.ui.getWinningNumbers();
    this.checkIsEmpty(winningNumbersInput);
    Validate.validateWinningNumbers(winningNumbersInput);
    const winningNumbers = winningNumbersInput.map(Number);
    const bonusNumber = this.ui.getBonusNumber();
    Validate.validateBonusNumber(bonusNumber, winningNumbers);

    return { winningNumbers, bonusNumber };
  }


  checkIsEmpty(value) {
    if (value.length < 1) {
      throw new Error('[ERROR] 당첨번호를 입력해 주세요.');
    }
  }

  resetGame() {
    this.price = 0;
    this.lottos = [];
    this.ui.resetGameUI();
    this.ui.enablePurchaseButton();
    this.ui.closeResultModal();
  }
}

export default LottoGame;
