import { LottoWebInputView } from "../view/LottoWebInputView.js";
import { Validator } from "../validator/Validator.js";

class LottoWebController {
  play() {
    LottoWebInputView.bindPurchase(() => this.handlePurchase());
  }

  handlePurchase() {
    const money = LottoWebInputView.getPurchaseMoney();
  }
}

export default LottoWebController;
