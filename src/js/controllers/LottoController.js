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
    this.paymentController = new PaymentController();
    this.ticketController = new TicketController();
    this.winningNumberController = new WinningNumberController();
    this.statisticController = new StatisticController();
    this.paymentController.init(this);
    this.ticketController.init(this);
    this.winningNumberController.init(this);
    this.statisticController.init(this);
  }

  afterPurchaseLottos() {
    this.ticketController.renderTicketListView();
  }

  afterSetWinningStatistic() {
    this.statisticController.renderView();
  }

  afterClickedResetButton() {
    this.lottoModel.setInitialState();
    this.paymentController.resetInput();
    this.ticketController.renderTicketListView();
    this.winningNumberController.resetInput();
  }
}
