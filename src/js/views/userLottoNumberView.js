import { qs, qsAll, on, newCustomEvent } from '../utils/helper.js';

export default class UserLottoNumberView {
  constructor() {
    this.userLottoWrap = qs('#user-lotto');
    this.userLottoResultForm = qs('#user-lotto-form');
    this.userLottoNumberInput = qsAll('.user-lotto-number');
    this.userBonusNumberInput = qs('.user-bonus-number');
    
    this.bindEvents();
  }

  bindEvents() {
    on([...this.userLottoNumberInput], 'keydown', this.handleUserLottoInput.bind(this));
    on(this.userBonusNumberInput, 'keydown', this.handleUserLottoInput.bind(this));
    on(this.userLottoResultForm, 'submit', this.handleUserLottoResult.bind(this));
  }

  handleUserLottoInput(event) {
    event.key !== 'Backspace' && event.target.value.length > 1 ? event.preventDefault() : '';
  }

  handleUserLottoResult(event) {
    event.preventDefault();
    const lottoNumbers = {
      lottoNumber: this.userLottoNumberInput.map((numberInput) => Number(numberInput.value)),
      bonusNumber: [Number(this.userBonusNumberInput.value)]
    };
    newCustomEvent(this.userLottoResultForm, '@userLottoNumbers', lottoNumbers);
  }

  showUserLottoInput() {
    this.userLottoWrap.style.opacity = 0.99;
  }

  cleanUserLottoInput() {
    this.userLottoNumberInput.forEach((lottoInput) => lottoInput.value = '');
    this.userBonusNumberInput.value = '';
    this.userLottoWrap.style.opacity = 0;
  }

}