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

  generateLottoNumber() {
    // TODO: 1, 45를 상수 처리
    // TODO: 중복 숫자 처리
    const lottoNumber = [];

    while (lottoNumber.length < 6) {
      const num = getRandomNumber(1, 45);
      if (lottoNumber.includes(num)) {
        continue;
      }
      lottoNumber.push(num);
    }

    return lottoNumber.sort((a, b) => a - b);
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

      const lottoCount = money / 1000;

      const lottos = Array.from(
        { length: lottoCount },
        () => new Lotto(this.generateLottoNumber())
      );

      this.store.save('lottos', lottos);
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
