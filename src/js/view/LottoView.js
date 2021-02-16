import { $, $$ } from '../util/index.js';

export default class LottoView {
  show(element) {
    $(element).classList.remove('d-none');
  }

  hide(element) {
    $(element).classList.add('d-none');
  }
}
