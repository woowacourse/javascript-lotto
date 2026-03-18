import { Validator } from "../validator/Validator.js";
import { calculateLottoCountService } from "../service/calculateLottoCountService.js";
import { lottoService } from "../service/lottoService.js";

class PurchaseController {
  constructor(state, inputView, outputView) {
    this.state = state;
    this.inputView = inputView;
    this.outputView = outputView;
  }

  bindEvents() {
    this.inputView.bindPurchase(() => this.handlePurchase());
  }

  handlePurchase() {
    try {
      this.outputView.clearMoneyError();

      const money = this.inputView.getPurchaseMoney();
      Validator.validatePurchaseMoney(money);

      const count = calculateLottoCountService(money);
      const randomLottos = lottoService(count);

      this.state.money = money;
      this.state.randomLottos = randomLottos;

      this.outputView.showPurchaseSection();
      this.outputView.renderLottoCount(count);
      this.outputView.renderLottos(randomLottos);
    } catch (error) {
      this.outputView.showMoneyError(error.message);
    }
  }
}

export default PurchaseController;
