import PaymentController from './subController/PaymentController.js';
import TicketController from './subController/TicketController.js';
import WinningNumberController from './subController/WinningNumberController.js';
import StatisticController from './subController/StatisticController.js';

export default class LottoController {
  constructor(model, view) {
    this.lottoModel = model;
    this.lottoView = view;
  }

  init() {
    this.lottoView.init();
    this.setSubControllers();
  }

  setSubControllers() {
    this.paymentController = new PaymentController(this);
    this.ticketController = new TicketController(this);
    this.winningNumberController = new WinningNumberController(this);
    this.statisticController = new StatisticController(this);
  }

  afterPurchaseLottos() {
    this.ticketController.renderTicketListView();
  }

  afterCalculateResult() {
    this.statisticController.renderView();
  }

  afterClickedResetButton() {
    this.lottoModel.setInitialState();
    this.paymentController.resetInput();
    this.ticketController.renderTicketListView();
    this.winningNumberController.resetInput();
  }
}
