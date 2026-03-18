class StatisticsModalController {
  constructor(state, inputView, outputView) {
    this.state = state;
    this.inputView = inputView;
    this.outputView = outputView;
  }

  bindEvents() {
    this.inputView.bindCloseModal(() => this.handleCloseModal());
    this.inputView.bindRestart(() => this.handleRestart());
  }

  handleCloseModal() {
    this.outputView.hideModal();
  }

  handleRestart() {
    this.state.money = 0;
    this.state.randomLottos = [];
    this.state.result = null;
    this.state.profit = 0;

    this.outputView.hidePurchaseSection();
    this.outputView.hideModal();
    this.inputView.reset();
  }
}

export default StatisticsModalController;
