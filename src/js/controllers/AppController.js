import Controller from '../core/Controller.js';
import LottoModel from '../models/LottoModel.js';

export default class AppController extends Controller {
  init() {
    this.models.lottoModel.init((message) => {
      this.views.ticketSectionView.update(message);
    });

    this.bindEventHandlers();
  }

  bindEventHandlers() {
    this.views.paymentSectionView.bindOnClickPaymentSubmit(
      this.purchase.bind(this)
    );
    this.views.ticketSectionView.bindOnClickNumberToggle();
  }

  issueLottoWithCount(count) {
    this.models.lottoModel.update({
      lottoList: Array.from({ length: count }, () => LottoModel.issueLotto()),
    });

    return this.models.lottoModel.getState();
  }

  purchase(amount) {
    const message = this.issueLottoWithCount(LottoModel.getLottoCount(amount));

    this.views.ticketSectionView.update(message);
  }
}
