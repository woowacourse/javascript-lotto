import PaymentController from './subController/PaymentController.js';
import TicketController from './subController/TicketController.js';
import WinningNumberController from './subController/WinningNumberController';

export default class LottoController {
  constructor(model, view) {
    this.lottoModel = model;
    this.lottoView = view;
  }

  init() {
    this.lottoModel.init();
    this.lottoView.init();
    this.setSubControllers();
  }

  setSubControllers() {
    this.paymentController = new PaymentController(this);
    this.ticketController = new TicketController(this);
    this.winningNumberController = new WinningNumberController(this);
  }

  afterPurchaseLottos() {
    this.ticketController.renderTicketListView();
  }

  afterCalculateResult() {}
}
