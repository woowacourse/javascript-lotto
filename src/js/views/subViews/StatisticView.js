import { $ } from '../../utils/utils.js';
import template from '../../templates/template';
import { DOM_STRING, SELECTOR } from '../../configs/contants.js';

export default class StatisticView {
  constructor(target) {
    this.$target = $(target);
  }

  mountTemplate(winningStatistic, earningRatio) {
    this.$target.innerHTML = template.statisticSectionWrap(
      winningStatistic,
      earningRatio
    );
    this.showView();
    this.afterMounted();
  }

  showView() {
    this.$target.classList.remove(DOM_STRING.BLIND);
  }

  removeView() {
    this.$target.classList.add(DOM_STRING.BLIND);
  }

  afterMounted() {
    this.$resetButton = $(SELECTOR.STATISTIC_SECTION_RESET_BUTTON);
    this.$closeButton = $(SELECTOR.CLOSE_BUTTON);
  }

  bindOnClickResetButton(callback) {
    this.$resetButton.addEventListener('click', (event) => {
      event.preventDefault();
      this.removeView();
      callback();
    });
  }

  bindOnClickCloseButton(callback) {
    this.$closeButton.addEventListener('click', (event) => {
      event.preventDefault();
      this.removeView();
      callback();
    });
  }
}
