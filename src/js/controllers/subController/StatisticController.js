import StatisticView from '../../views/subViews/StatisticView.js';

export default class StatisticController {
  constructor(controller) {
    this.lottoController = controller;
    this.statisticView = new StatisticView('#statistic-section-wrap');
    this.rendeView();
    this.setEventHandler();
  }

  rendeView() {
    this.statisticView.render();
  }

  appearView() {
    this.statisticView.appearView();
  }

  disappearView() {
    this.statisticView.disappearView();
  }

  setEventHandler() {
    this.statisticView.bindOnClickResetButton(
      this.didClickResetButton.bind(this)
    );
  }

  didClickResetButton() {}
}
