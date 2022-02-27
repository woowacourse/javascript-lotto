import Controller from '../core/Controller.js';
import LottoModel from '../models/LottoModel.js';

export default class AppController extends Controller {
  bindEventHandlers() {
    this.view.bindOnClickPaymentSubmit(this.purchase.bind(this));
    this.view.bindOnClickNumberToggle();
  }

  issueLottoWithCount(count) {
    this.model.update({
      lottoList: Array(count)
        .fill()
        .map(() => LottoModel.issueLotto()),
    });

    return this.model.getState();
  }

  purchase(amount) {
    const message = this.issueLottoWithCount(LottoModel.getLottoCount(amount));

    this.updateView(message);
  }
}
