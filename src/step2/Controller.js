import Validator from '../step1/Validator.js';
import View from './View.js';
import { LottoMachine } from '../step1/LottoMachine.js';
import { WinningLotto } from '../step1/Lotto.js';

const HIDE_CONTENT_SELECTORS = [
  document.querySelector('#purchase-lotto-content'),
  document.querySelector('#winning-lotto-content'),
];


const Controller = {
  lottoMacine: null,

  submitPurchaseAmount(amount) {
    try {
      Validator.validatePurchaseAmount(amount);
      this.lottoMachine = new LottoMachine(amount);
      View.renderPurchaseLotto(this.lottoMachine.getLottos());
      View.convertHiddenState(HIDE_CONTENT_SELECTORS);
    } catch (err) {
      View.renderPurchaseAmountErrorMessage(err.message);
    }
  },

  submitWinningNumbers(winningLottoNumber, bonusNumber) {
    try {
      Validator.validateLottoNumber(winningLottoNumber);
      Validator.validateBonusNumber(winningLottoNumber, bonusNumber);
      const winningLotto = new WinningLotto(winningLottoNumber, bonusNumber);
      this.lottoMachine.calculateMatchResult(
        winningLotto.getWinningNumber(), winningLotto.getBonusNumber()
      );
      View.openModal();
      View.renderMatchResultModal(
        this.lottoMachine.getMatchResultSummary(),
        this.lottoMachine.getRateOfReturn()
      );
    } catch (err) {
      View.renderWinningLottoNumberErrorMessage(err.message);
    }
  },

  restart() {
    View.closeModal();
    this.lottoMachine = null;
    View.clearAllInput();
    View.convertHiddenState(HIDE_CONTENT_SELECTORS);
  }
}

export default Controller;