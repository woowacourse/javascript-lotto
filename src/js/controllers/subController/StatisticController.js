import StatisticView from '../../views/subViews/StatisticView.js';

export default class StatisticController {
  init(controller) {
    this.lottoController = controller;
    this.lottoModel = controller.lottoModel;
    this.statisticView = new StatisticView('#statistic-section-wrap');
  }

  renderView() {
    const earningRatio = this.lottoModel.getEarningRatio();
    const { winningStatistic } = this.lottoModel.getState();
    this.statisticView.mountTemplate(winningStatistic, earningRatio);
    this.setEventHandler();
  }

  setEventHandler() {
    this.statisticView.bindOnClickResetButton(
      this.didClickResetButton.bind(this)
    );
  }

  didClickResetButton() {
    this.statisticView.disappearView();
    this.lottoController.afterClickedResetButton();
  }
}
