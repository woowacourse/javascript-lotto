import LottoWebInputView from "../view/LottoWebInputView.js";
import LottoWebOutputView from "../view/LottoWebOutputView.js";
import { Validator } from "../validator/Validator.js";
import { calculateLottoCountService } from "../service/calculateLottoCountService.js";
import { lottoService } from "../service/lottoService.js";
import WinningLotto from "../domain/WinningLotto.js";
import { compareResultService } from "../service/compareResultService.js";
import { profitService } from "../service/profitService.js";

class LottoWebController {
  constructor() {
    this.money = 0;
    this.randomLottos = [];
    this.inputView = new LottoWebInputView();
    this.outputView = new LottoWebOutputView();
  }

  play() {
    this.inputView.bindPurchase(() => this.handlePurchase());
    this.inputView.bindSubmit(() => this.handleSubmit());
    this.inputView.bindCloseModal(() => this.handleCloseModal());
    this.inputView.bindRestart(() => this.handleRestart());
  }

  handlePurchase() {
    try {
      this.outputView.clearMoneyError();

      const money = this.inputView.getPurchaseMoney();
      Validator.validatePurchaseMoney(money);
      this.money = money;

      const count = calculateLottoCountService(money);
      this.randomLottos = lottoService(count);

      this.outputView.showPurchaseSection();

      this.outputView.renderLottoCount(count);
      this.outputView.renderLottos(this.randomLottos);
    } catch (error) {
      this.outputView.showMoneyError(error.message);
    }
  }

  handleSubmit() {
    try {
      this.outputView.clearWinningBonusError();

      const winningNumbers = this.inputView.getWinningNumbers();
      Validator.validateWinningNumber(winningNumbers);

      const bonusNumber = this.inputView.getBonusNumber();
      Validator.validateBonusNumber(winningNumbers, bonusNumber);

      const winningLotto = new WinningLotto(winningNumbers, bonusNumber);
      const result = compareResultService(this.randomLottos, winningLotto);
      const profit = profitService(this.money, result);

      this.outputView.renderResult(result);
      this.outputView.renderProfit(profit);
      this.outputView.showModal();
    } catch (error) {
      this.outputView.showWinningBonusError(error.message);
    }
  }

  handleCloseModal() {
    this.outputView.hideModal();
  }

  handleRestart() {
    this.money = 0;
    this.randomLottos = [];
    this.outputView.hidePurchaseSection();

    this.inputView.reset();
    this.outputView.hideModal();
  }
}

export default LottoWebController;
