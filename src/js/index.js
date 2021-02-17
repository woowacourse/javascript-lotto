import { $, createElement, getRandomNumber } from './utils.js';
import { ALERT_MESSAGE, LOTTO } from './constants.js';
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
    const lottoNumber = [];

    while (lottoNumber.length < LOTTO.NUMBER_COUNT) {
      const num = getRandomNumber(LOTTO.MINIMUM_NUMBER, LOTTO.MAXIMUM_NUMBER);
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

      if (money < LOTTO.PRICE) {
        alert(ALERT_MESSAGE.INVALID_MONEY_INPUT);
        return;
      }

      const lottoCount = Math.floor(money / LOTTO.PRICE);

      const lottos = Array.from(
        { length: lottoCount },
        () => new Lotto(this.generateLottoNumber())
      );

      this.store.save('lottos', lottos);

      const $lottoListChildren = lottos.map((lotto) => {
        const $lottoSpan = createElement('span', 'lotto mx-1 text-4xl', '🎟️ ');
        $lottoSpan.appendChild(createElement('span', 'lotto-numbers', lotto.numbers.join(', ')));
        return $lottoSpan;
      });

      $('.lotto-list').append(...$lottoListChildren);
      $('.lotto-count').append(lottoCount);

      $('.lotto-list-container').classList.remove('hidden');
      $('.winning-number-form-container').classList.remove('hidden');

      $('#money-input').setAttribute('disabled', 'disabled');
      $('#money-submit-button').setAttribute('disabled', 'disabled');
    });

    $('.lotto-numbers-toggle-button').addEventListener('change', () => {
      const toggleStatus = $('.lotto-numbers-toggle-button').checked;

      if (toggleStatus) {
        $('.lotto-list').classList.add('show-number');
        return;
      }

      $('.lotto-list').classList.remove('show-number');
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
