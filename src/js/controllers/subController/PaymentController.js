import PaymentView from '../../views/subViews/PaymentView.js';
import { SELECTOR } from '../../configs/contants.js';
import validator from '../../utils/validator.js';

export default class PaymentController {
  constructor(lottoController, lottoModel) {
    this.lottoController = lottoController;
    this.lottoModel = lottoModel;
  }

  renderView() {
    this.paymentView = new PaymentView(SELECTOR.PAYMENT_SECTION);
    this.paymentView.render();
    this.setEventHandler();
  }

  setEventHandler() {
    this.paymentView.bindOnClickPaymentSubmit(
      this.didClickPaymentSubmit.bind(this)
    );
  }

  didClickPaymentSubmit(amount) {
    try {
      validator.checkPurchaseAmount(amount);
      this.purchaseLottos(amount);
    } catch (error) {
      alert(error.message);
    }
  }

  purchaseLottos(amount) {
    this.lottoModel.setLottoListWithAmount(amount);
    this.lottoController.afterPurchaseLottos();
  }

  resetInput() {
    this.paymentView.clearInput();
  }
}
