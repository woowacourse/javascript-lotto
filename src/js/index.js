import {
  $,
  isUniqueArray,
  showElement,
  hideElement,
  disableElement,
  enableElement,
} from './utils.js';
import { ALERT_MESSAGE, LOTTO, WINNING_PRICE } from './constants.js';
import Lotto from './models/Lotto.js';
import LottoView from './views/LottoView.js';

class LottoApp {
  constructor() {
    this.view = new LottoView();
    this.data = {
      lottos: [],
      cost: 0,
    };

    this.bindEvents();
  }

  generateLottos(lottoCount) {
    return Array.from({ length: lottoCount }, () => new Lotto());
  }

  handleSubmitMoney(event) {
    event.preventDefault();

    const money = Number(event.target.elements['money-input'].value);

    if (money < LOTTO.PRICE) {
      alert(ALERT_MESSAGE.INVALID_MONEY_INPUT);
      return;
    }

    const lottoCount = Math.floor(money / LOTTO.PRICE);
    this.data.cost = LOTTO.PRICE * lottoCount;
    this.data.lottos = this.generateLottos(lottoCount);

    this.view.renderLottoList(this.data.lottos);
    showElement($('.lotto-list-section'));
    showElement($('.winning-number-form-section'));
    disableElement($('#money-input'));
    disableElement($('#money-submit-button'));

    $('.winning-number:first-child').focus();
  }

  handleToggleLottoNumbers() {
    $('.lotto-list').classList.toggle('show-number');
  }

  handleInputWinningNumbers(event) {
    if (!event.target.classList.contains('winning-number')) return;

    if (event.target.value.length >= 2) {
      const $nextInput = event.target.nextElementSibling;

      if ($nextInput) {
        $nextInput.focus();
        $nextInput.select();
        return;
      }

      $('.bonus-number').focus();
      $('.bonus-number').select();
    }
  }

  handleSubmitWinningNumbers(event) {
    event.preventDefault();

    const bonusNumber = event.target.elements['bonus-number'].valueAsNumber;
    const $winningNumbers = [...event.target.elements['winning-number']];
    const winningNumbers = $winningNumbers.map(($number) => $number.valueAsNumber);

    if (!isUniqueArray([...winningNumbers, bonusNumber])) {
      alert(ALERT_MESSAGE.INVALID_WINNING_NUMBER_INPUT);
      return;
    }

    showElement($('.modal'));

    const result = this.getResult(winningNumbers, bonusNumber);
    this.view.renderWinningResult(result);
  }

  getResult(winningNumbers, bonusNumber) {
    // TODO : 함수 내부에 상수 선언 조심하기
    const winningRankCounts = {
      first: 0, // 6개 일치
      second: 0, // 5개 + 보너스 숫자 일치
      third: 0, // 5개 일치
      fourth: 0, // 4개 일치
      fifth: 0, // 3개 일치
      lose: 0, // 꽝
    };

    let winningTotalPrice = 0;

    this.data.lottos.forEach((lotto) => {
      const rank = lotto.getWinningRank(winningNumbers, bonusNumber);

      winningRankCounts[rank] += 1;
      winningTotalPrice += WINNING_PRICE[rank];
    });

    const winningRate = ((winningTotalPrice / this.data.cost) * 100).toFixed(2);

    return { winningRankCounts, winningRate };
  }

  handleRestart() {
    this.data = {
      lottos: [],
      cost: 0,
    };

    hideElement($('.lotto-list-section'));
    hideElement($('.winning-number-form-section'));
    hideElement($('.modal'));
    enableElement($('#money-input'));
    enableElement($('#money-submit-button'));

    $('#money-input-form').reset();
    $('#winning-number-form').reset();
    $('#money-input').focus();
    $('.lotto-list').remove();
  }

  handleCloseModal() {
    hideElement($('.modal'));
  }

  bindEvents() {
    $('#money-input-form').addEventListener('submit', this.handleSubmitMoney.bind(this));

    $('.lotto-numbers-toggle-button').addEventListener(
      'change',
      this.handleToggleLottoNumbers.bind(this)
    );

    $('#winning-number-form').addEventListener('input', this.handleInputWinningNumbers.bind(this));
    $('#winning-number-form').addEventListener(
      'submit',
      this.handleSubmitWinningNumbers.bind(this)
    );

    $('.modal-close').addEventListener('click', this.handleCloseModal.bind(this));

    $('.restart-button').addEventListener('click', this.handleRestart.bind(this));
  }
}

const lottoApp = new LottoApp();
lottoApp();
