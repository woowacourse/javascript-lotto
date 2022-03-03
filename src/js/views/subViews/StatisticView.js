import { $ } from '../../utils/utils.js';
import template from '../../templates/template';

export default class StatisticView {
  constructor(target) {
    this.$target = $(target);
  }

  mountTemplate(winningStatistic, earningRate) {
    this.$target.innerHTML = template.statisticSectionWrap(
      winningStatistic,
      earningRate
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
  }

  bindOnClickResetButton(callback) {
    this.$resetButton.addEventListener('click', (event) => {
      event.preventDefault();
      callback();
    });
  }
}
