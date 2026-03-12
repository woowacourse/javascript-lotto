import { LottoWebInputView } from "../view/LottoWebInputView.js";
import { LottoWebOutputView } from "../view/LottoWebOutputView.js";
import { Validator } from "../validator/Validator.js";
import { calculateLottoCountService } from "../service/calculateLottoCountService.js";
import { lottoService } from "../service/lottoService.js";

const lottoSection = document.querySelector(".lotto-section");
const winningInputSection = document.querySelector(
  ".winning-bonus-input-section",
);
const submitButton = document.querySelector("#submit");
const modal = document.querySelector(".modal");

class LottoWebController {
  play() {
    LottoWebInputView.bindPurchase(() => this.handlePurchase());
    LottoWebInputView.bindSubmit(() => this.handleSubmit());
  }

  handlePurchase() {
    try {
      LottoWebOutputView.clearMoneyError();

      const money = LottoWebInputView.getPurchaseMoney();
      Validator.validatePurchaseMoney(money);

      const count = calculateLottoCountService(money);
      const randomLottos = lottoService(count);

      lottoSection.classList.remove("hidden");
      winningInputSection.classList.remove("hidden");
      submitButton.classList.remove("hidden");

      LottoWebOutputView.renderLottoCount(count);
      LottoWebOutputView.renderLottos(randomLottos);
    } catch (error) {
      LottoWebOutputView.showMoneyError(error.message);
    }
  }

  handleSubmit() {
    try {
      const winningNumbers = LottoWebInputView.getWinningNumbers();
      Validator.validateWinningNumber(winningNumbers);

      const bonusNumber = LottoWebInputView.getBonusNumber();
      Validator.validateBonusNumber(winningNumbers, bonusNumber);

      modal.classList.remove("hidden");
    } catch (error) {
      alert(error.message);
    }
  }
}

export default LottoWebController;
