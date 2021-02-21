import { $, getRandomNumber, showElement, disableElement } from './utils.js';
import { ALERT_MESSAGE, LOTTO } from './constants.js';
import Lotto from './objects/Lotto.js';
import LottoView from './views/LottoView.js';

class LottoApp {
  constructor() {
    this.view = new LottoView();
    this.data = {
      lottos: [],
    };

    this.bindEvents();
  }

  generateLottoNumbers() {
    const lottoNumbers = [];

    while (lottoNumbers.length < LOTTO.NUMBER_COUNT) {
      const num = getRandomNumber(LOTTO.MINIMUM_NUMBER, LOTTO.MAXIMUM_NUMBER);

      if (lottoNumbers.includes(num)) continue;
      lottoNumbers.push(num);
    }

    return lottoNumbers.sort((a, b) => a - b);
  }

  generateLottos(lottoCount) {
    return Array.from({ length: lottoCount }, () => new Lotto(this.generateLottoNumbers()));
  }

  handleSubmitMoney(event) {
    event.preventDefault();

    const money = event.target.elements['money-input'].valueAsNumber;
    console.log(event);

    if (money < LOTTO.PRICE) {
      alert(ALERT_MESSAGE.INVALID_MONEY_INPUT);
      return;
    }

    const lottoCount = Math.floor(money / LOTTO.PRICE);
    this.data.lottos = this.generateLottos(lottoCount);

    this.view.renderLottoList(this.data.lottos);
    showElement($('.lotto-list-container'));
    showElement($('.winning-number-form-container'));
    disableElement($('#money-input'));
    disableElement($('#money-submit-button'));

    $('.winning-number:first-child').focus();
  }

  handleToggleLottoNumbers() {
    $('.lotto-list').classList.toggle('show-number');
  }

  bindEvents() {
    $('#money-input-form').addEventListener('submit', this.handleSubmitMoney.bind(this));

    $('.lotto-numbers-toggle-button').addEventListener(
      'change',
      this.handleToggleLottoNumbers.bind(this)
    );
  }
}

new LottoApp();

// TODO: 추후 Step 2 구현에 필요한 초기 코드
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
