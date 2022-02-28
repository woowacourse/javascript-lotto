import { qs, qsAll, on, emit } from '../utils/helper.js';

export default class UserLottoNumberView {
  constructor() {
    this.userLottoResultForm = qs('#user-lotto-form');
    this.userLottoNumber = qsAll('.user-lotto-number');
    this.userBonusNumber = qs('.user-bonus-number');

    this.bindEvents();
  }

  bindEvents() {
    on(this.userLottoResultForm, 'submit', this.handleUserLottoResult.bind(this));
  }

  handleUserLottoResult(event) {
    event.preventDefault();
    const lottoNumbers = {
      lottoNumber: this.userLottoNumber.map((numberInput) => numberInput.value),
      bonusNumber: [this.userBonusNumber.value]
    };
    emit(this.userLottoResultForm, '@userLottoNumbers', lottoNumbers);
  }
}