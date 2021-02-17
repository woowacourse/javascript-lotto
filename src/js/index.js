import { $, getRandomNumber } from './utils.js';
import Store from './Store.js';
import Lotto from './objects/Lotto.js';
import LottoView from './views/LottoView.js';

class LottoApp {
  constructor() {
    this.store = new Store();
    this.view = new LottoView();

    this.bindEvents();
  }

  bindEvents() {
    $('#money-input-form').addEventListener('submit', (event) => {
      event.preventDefault();

      const money = Number($('#money-input').value);

      // TODO: 1000를 상수 처리
      if (money < 1000) {
        alert('최소 1,000원 이상의 금액을 입력하세요.');
        return;
      }
    });
  }
}

new LottoApp();

// const $showResultButton = document.querySelector('.open-result-modal-button')
// const $modalClose = document.querySelector('.modal-close')
// const $modal = document.querySelector('.modal')
// const $lottoNumbersToggleButton = document.querySelector(
//   '.lotto-numbers-toggle-button'
// )

// const onModalShow = () => {
//   $modal.classList.add('open')
// }

// const onModalClose = () => {
//   $modal.classList.remove('open')
// }

// $showResultButton.addEventListener('click', onModalShow)
// $modalClose.addEventListener('click', onModalClose)
