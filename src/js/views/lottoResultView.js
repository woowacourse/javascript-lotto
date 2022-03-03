import { $ } from '../utils/helper.js';
import { lottoResultModalTemplate } from '../utils/template.js';

export default class LottoResultView {
  #app;

  constructor() {
    this.#app = $('#app');
  }

  render() {
    this.#app.insertAdjacentHTML('afterend', lottoResultModalTemplate());
  }
}
