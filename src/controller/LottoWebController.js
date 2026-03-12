import { LottoWebInputView } from "../view/LottoWebInputView.js";
import { Validator } from "../validator/Validator.js";
import { calculateLottoCountService } from "../service/calculateLottoCountService.js";
import { lottoService } from "../service/lottoService.js";

class LottoWebController {
  play() {
    const money = LottoWebInputView.bindPurchase(() => this.handlePurchase());
    const count = calculateLottoCountService(money);
    const randomLottos = lottoService(count);
  }

  handlePurchase() {
    try {
      const money = LottoWebInputView.getPurchaseMoney();
      Validator.validatePurchaseMoney(money);
      return money;
    } catch (error) {
      alert(error.message);
    }
  }
}

export default LottoWebController;
