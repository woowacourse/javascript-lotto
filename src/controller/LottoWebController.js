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

class LottoWebController {
  play() {
    LottoWebInputView.bindPurchase(() => this.handlePurchase());
  }

  handlePurchase() {
    try {
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
      alert(error.message);
    }
  }
}

export default LottoWebController;
