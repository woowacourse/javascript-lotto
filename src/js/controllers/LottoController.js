import Controller from '../core/Controller.js';

export default class LottoController extends Controller {
  bindEventHandlers() {
    this.view.bindOnClickPaymentSubmit(this.purchase.bind(this));
    this.view.bindOnClickNumberToggle();
  }

  purchase(amount) {
    this.model.purchase(amount, (message) => {
      this.updateView(message);
    });
  }
}
