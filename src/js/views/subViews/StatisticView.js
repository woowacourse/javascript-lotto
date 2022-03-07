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
    this.$statisticSection = $(SELECTOR.STATISTIC_SECTION);
    this.$resetButton = $(SELECTOR.STATISTIC_SECTION_RESET_BUTTON);
    this.$closeButton = $(SELECTOR.CLOSE_BUTTON);
  }

  bindOnClickButtons({ resetCallback, closeCallback }) {
    this.$statisticSection.addEventListener('click', (event) => {
      event.preventDefault();

      switch (event.target) {
        case this.$resetButton:
          this.removeView();
          resetCallback();
          break;
        case this.$closeButton:
          this.removeView();
          closeCallback();
          break;
      }
    });
  }
}
