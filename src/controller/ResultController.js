import WinningLotto from "../domain/WinningLotto.js";
import { compareResultService } from "../service/compareResultService.js";
import { profitService } from "../service/profitService.js";
import { Validator } from "../validator/Validator.js";

class ResultController {
  constructor(state, inputView, outputView) {
    this.state = state;
    this.inputView = inputView;
    this.outputView = outputView;
  }

  bindEvents() {
    this.inputView.bindSubmit(() => this.handleSubmit());
  }

  handleSubmit() {
    try {
      this.outputView.clearWinningBonusError();

      const winningNumbers = this.inputView.getWinningNumbers();
      Validator.validateWinningNumber(winningNumbers);

      const bonusNumber = this.inputView.getBonusNumber();
      Validator.validateBonusNumber(winningNumbers, bonusNumber);

      const winningLotto = new WinningLotto(winningNumbers, bonusNumber);
      const result = compareResultService(this.state.randomLottos, winningLotto);
      const profit = profitService(this.state.money, result);

      this.state.result = result;
      this.state.profit = profit;

      this.outputView.renderResult(result);
      this.outputView.renderProfit(profit);
      this.outputView.showModal();
    } catch (error) {
      this.outputView.showWinningBonusError(error.message);
    }
  }
}

export default ResultController;
