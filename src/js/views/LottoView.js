import template from '../templates/template.js';
import { $ } from '../utils/utils.js';

export default class LottoView {
  constructor(target) {
    this.$target = $(target);
  }

  init() {
    this.mountTemplate();
  }

  mountTemplate() {
    this.$target.innerHTML = template.app();
  }
}
