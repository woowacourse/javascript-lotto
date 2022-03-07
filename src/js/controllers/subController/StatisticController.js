import { SELECTOR } from '../../configs/contants.js';
import StatisticView from '../../views/subViews/StatisticView.js';

export default class StatisticController {
  constructor(lottoController, lottoModel) {
    this.lottoController = lottoController;
    this.lottoModel = lottoModel;
    this.statisticView = new StatisticView(SELECTOR.STATISTIC_SECTION_WRAP);
  }

  renderView() {
    const earningRatio = this.lottoModel.getEarningRatio();
    const { winningStatistic } = this.lottoModel.getState();

    this.statisticView.mountTemplate(winningStatistic, earningRatio);
    this.setEventHandlers();
  }

  setEventHandlers() {
    this.statisticView.bindOnClickButtons({
      resetCallback: this.didClickResetButton.bind(this),
      closeCallback: this.didClickCloseButton.bind(this),
    });
  }

  didClickResetButton() {
    this.lottoController.afterClickedResetButton();
  }

  didClickCloseButton() {
    this.lottoController.afterClickCloseButton();
  }
}
