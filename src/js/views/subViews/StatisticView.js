import { $ } from '../../utils/utils.js';
import template from '../../templates/template';

export default class StatisticView {
  constructor(target) {
    this.$target = $(target);
  }

  render(winningStatistic, earningRate) {
    this.$target.innerHTML = template.statisticSectionWrap(
      winningStatistic,
      earningRate
    );
  }

  appearView() {
    this.$target.classList.remove('blind');
  }

  disappearView() {
    this.$target.classList.add('blind');
  }
}
