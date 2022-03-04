import { $, $$ } from '../utils/dom';

export default class ShowLottoNumber {
  constructor() {
    $('.cm-toggle').addEventListener('click', this.handleDetailView);
  }

  handleDetailView() {
    $('.lotto-grid').classList.toggle('lotto-grid-detail');

    $$('.lotto-number-detail').forEach((element) => {
      element.classList.toggle('d-none');
    });
  }
}
