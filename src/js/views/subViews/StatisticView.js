import { $ } from '../../utils/utils.js';
import template from '../../templates/template';

export default class StatisticView {
  constructor(target) {
    this.$target = $(target);
  }

  mountTemplate(winningStatistic, earningRatio) {
    this.$target.innerHTML = template.statisticSectionWrap(
      winningStatistic,
      earningRatio
    );
    this.appearView();
    this.afterMounted();
  }

  appearView() {
    this.$target.classList.remove('blind');
  }

  disappearView() {
    this.$target.classList.add('blind');
  }

  afterMounted() {
    this.$resetButton = $('#reset-button');
    this.$closeButton = $('#close-button');
  }

  bindOnClickResetButton(callback) {
    [this.$resetButton, this.$closeButton].forEach((button) =>
      button.addEventListener('click', (event) => {
        event.preventDefault();
        callback();
      })
    );
  }
}
