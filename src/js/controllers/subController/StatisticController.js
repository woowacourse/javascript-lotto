import StatisticView from '../../views/subViews/StatisticView.js';

export default class StatisticController {
  constructor(controller) {
    this.lottoController = controller;
    this.lottoModel = controller.lottoModel;
    this.statisticView = new StatisticView('#statistic-section-wrap');
  }

  renderView() {
    const winningStatistic = this.lottoModel.getWinningStatistic();
    const earningRate = this.lottoModel.getEarningRate();
    this.statisticView.mountTemplate(winningStatistic, earningRate);
    this.setEventHandler();
  }

  setEventHandler() {
    this.statisticView.bindOnClickResetButton(
      this.didClickResetButton.bind(this)
    );
  }

  didClickResetButton() {
    this.statisticView.disappearView();
  }
}
