import PaymentView from '../../views/subViews/PaymentView.js';
import { SELECTOR } from '../../configs/contants.js';
import { validator } from '../../utils/validator.js';

export default class PaymentController {
  constructor(controller) {
    this.lottoController = controller;
    this.lottoModel = controller.lottoModel;
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
    } catch (e) {
      alert(e.message);
    }
  }

  purchaseLottos(amount) {
    this.lottoModel.createLottoListWithAmount(amount);
    this.lottoController.didPurchaseLottos();
  }
}
