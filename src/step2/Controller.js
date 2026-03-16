import Validator from '../step1/Validator.js';
import View from './View.js';
import { LottoMachine } from '../step1/LottoMachine.js';
import { WinningLotto } from '../step1/Lotto.js';
import Converter from './Converter.js';

const HIDE_CONTENT_SELECTORS = [
  document.querySelector('#purchase-lotto-content'),
  document.querySelector('#winning-lotto-content'),
];


const Controller = {
  lottoMachine: null,

  submitPurchaseAmount(amount) {
    if (!this.lottoMachine) {
      try {
        Validator.validatePurchaseAmount(amount);
        this.lottoMachine = new LottoMachine(amount);
        View.renderPurchaseLotto(this.lottoMachine.getLottos());
        View.show(HIDE_CONTENT_SELECTORS);
      } catch (err) {
        View.renderPurchaseAmountErrorMessage(err.message);
      }
    }
  },

  submitWinningNumbers(winningLottoNumber, bonusNumber) {
    try {
      if (!this.lottoMachine) {
        throw new Error('먼저 구매액을 입력해야합니다.');
      }
      Validator.validateLottoNumber(winningLottoNumber);
      Validator.validateBonusNumber(winningLottoNumber, bonusNumber);
      const winningLotto = new WinningLotto(winningLottoNumber, bonusNumber);
      this.lottoMachine.calculateMatchResult(
        winningLotto.getWinningNumber(), winningLotto.getBonusNumber()
      );
      View.openModal();
      View.renderMatchResultModal(
        Converter.matchResultSummary(this.lottoMachine.getMatchResultSummary()),
        this.lottoMachine.getRateOfReturn(),
      );
    } catch (err) {
      View.renderWinningLottoNumberErrorMessage(err.message);
    }
  },

  restart() {
    View.closeModal();
    this.lottoMachine = null;
    View.clearAllInput();
    View.hide(HIDE_CONTENT_SELECTORS);
  }
}

export default Controller;