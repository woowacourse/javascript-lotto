import PaymentController from './subController/PaymentController.js';
import TicketController from './subController/TicketController.js';
import WinningNumberContoroller from './subController/WinningNumberContoroller';

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
    this.paymentController = new PaymentController(this.lottoModel, this);
    this.ticketController = new TicketController(this.lottoModel);
    this.winningNumberController = new WinningNumberContoroller();
  }

  didPurchaseLottos() {
    this.ticketController.renderTicketListView();
  }
}
