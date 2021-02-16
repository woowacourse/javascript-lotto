import { $, $$ } from '../util/index.js';
import { LottoView } from '../view/index.js';

export default class LottoController {
  constructor() {
    this.view = new LottoView();
  }

  init() {
    this.view.hide('#lotto-section');
    this.view.hide('#lotto-result-form');
  }

  setEvent() {}
}
