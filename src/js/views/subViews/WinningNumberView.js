import template from '../../templates/template.js';
import { $ } from '../../utils/utils.js';

export default class WinningNumberView {
  constructor(target) {
    this.$target = $(target);
  }

  render() {
    this.$target.innerHTML = template.winningNumberSection();
  }
}
