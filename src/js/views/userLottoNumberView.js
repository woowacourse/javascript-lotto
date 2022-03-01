import { qs, qsAll, on, emit } from '../utils/helper.js';

export default class UserLottoNumberView {
  constructor() {
    this.userLottoResultForm = qs('#user-lotto-form');
    this.userLottoNumberInput = qsAll('.user-lotto-number');
    this.userBonusNumberInput = qs('.user-bonus-number');
    
    this.bindEvents();
  }

  bindEvents() {
    on(this.userLottoResultForm, 'submit', this.handleUserLottoResult.bind(this));
  }

  handleUserLottoResult(event) {
    event.preventDefault();
    const lottoNumbers = {
      lottoNumber: this.userLottoNumberInput.map((numberInput) => Number(numberInput.value)),
      bonusNumber: [Number(this.userBonusNumberInput.value)]
    };
    emit(this.userLottoResultForm, '@userLottoNumbers', lottoNumbers);
  }

  cleanUserLottoInput() {
    this.userLottoNumberInput.forEach((lottoInput) => lottoInput.value = '');
    this.userBonusNumberInput.value = '';
  }

}