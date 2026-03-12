import { LottoWebInputView } from "../view/LottoWebInputView.js";
import { LottoWebOutputView } from "../view/LottoWebOutputView.js";
import { Validator } from "../validator/Validator.js";
import { calculateLottoCountService } from "../service/calculateLottoCountService.js";
import { lottoService } from "../service/lottoService.js";
import WinningLotto from "../domain/WinningLotto.js";
import { compareResultService } from "../service/compareResultService.js";
import { profitService } from "../service/profitService.js";

const lottoSection = document.querySelector(".lotto-section");
const winningInputSection = document.querySelector(
  ".winning-bonus-input-section",
);
const submitButton = document.querySelector("#submit");

class LottoWebController {
  constructor() {
    this.money = 0;
    this.randomLottos = [];
  }

  play() {
    LottoWebInputView.bindPurchase(() => this.handlePurchase());
    LottoWebInputView.bindSubmit(() => this.handleSubmit());
    LottoWebInputView.bindCloseModal(() => this.handleCloseModal());
    LottoWebInputView.bindRestart(() => this.handleRestart());
  }

  handlePurchase() {
    try {
      LottoWebOutputView.clearMoneyError();

      const money = LottoWebInputView.getPurchaseMoney();
      Validator.validatePurchaseMoney(money);
      this.money = money;

      const count = calculateLottoCountService(money);
      this.randomLottos = lottoService(count);

      lottoSection.classList.remove("hidden");
      winningInputSection.classList.remove("hidden");
      submitButton.classList.remove("hidden");

      LottoWebOutputView.renderLottoCount(count);
      LottoWebOutputView.renderLottos(this.randomLottos);
    } catch (error) {
      LottoWebOutputView.showMoneyError(error.message);
    }
  }

  handleSubmit() {
    try {
      LottoWebOutputView.clearWinningBonusError();

      const winningNumbers = LottoWebInputView.getWinningNumbers();
      Validator.validateWinningNumber(winningNumbers);

      const bonusNumber = LottoWebInputView.getBonusNumber();
      Validator.validateBonusNumber(winningNumbers, bonusNumber);

      const winningLotto = new WinningLotto(winningNumbers, bonusNumber);
      const result = compareResultService(this.randomLottos, winningLotto);
      const profit = profitService(this.money, result);

      LottoWebOutputView.renderResult(result);
      LottoWebOutputView.renderProfit(profit);
      LottoWebOutputView.showModal();
    } catch (error) {
      LottoWebOutputView.showWinningBonusError(error.message);
    }
  }

  handleCloseModal() {
    LottoWebOutputView.hideModal();
  }

  handleRestart() {
    this.money = 0;
    this.randomLottos = [];
    lottoSection.classList.add("hidden");
    winningInputSection.classList.add("hidden");
    submitButton.classList.add("hidden");

    LottoWebInputView.reset();
    LottoWebOutputView.hideModal();
  }
}

export default LottoWebController;
