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
    this.renderSubViews();
  }

  setSubControllers() {
    this.paymentController = new PaymentController(this, this.lottoModel);
    this.ticketController = new TicketController(this, this.lottoModel);
    this.winningNumberController = new WinningNumberController(
      this,
      this.lottoModel
    );
    this.statisticController = new StatisticController(this, this.lottoModel);
  }

  renderSubViews() {
    this.paymentController.renderView();
    this.ticketController.renderView();
    this.winningNumberController.renderView();
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
    this.winningNumberController.resetView();
  }

  afterClickCloseButton() {
    this.winningNumberController.showResetButton();
  }
}
