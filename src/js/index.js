import {
  $,
  isUniqueArray,
  showElement,
  hideElement,
  disableElement,
  enableElement,
  getPriceByRank,
} from './utils.js';
import { ALERT_MESSAGE, LOTTO, VALUE } from './constants.js';
import Lotto from './models/Lotto.js';
import LottoView from './views/LottoView.js';

class LottoApp {
  constructor() {
    this.view = new LottoView();
    this.data = {
      lottos: [],
      cost: 0,
      winningRankCounts: {
        [VALUE.RANK.FIRST]: 0,
        [VALUE.RANK.SECOND]: 0,
        [VALUE.RANK.THIRD]: 0,
        [VALUE.RANK.FOURTH]: 0,
        [VALUE.RANK.FIFTH]: 0,
        [VALUE.RANK.LOSE]: 0,
      },
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

    const rate = this.getResult(winningNumbers, bonusNumber);
    this.view.renderWinningResult(this.data.winningRankCounts, rate);
  }

  getResult(winningNumbers, bonusNumber) {
    let winningTotalPrice = 0;

    this.data.lottos.forEach((lotto) => {
      const rank = lotto.getWinningRank(winningNumbers, bonusNumber);

      console.log(rank);
      this.data.winningRankCounts[rank] += 1;
      winningTotalPrice += getPriceByRank(rank);
    });

    const winningRate = ((winningTotalPrice / this.data.cost) * 100).toFixed(2);

    return winningRate;
  }

  handleRestart() {
    this.data = {
      lottos: [],
      cost: 0,
      winningRankCounts: {
        [VALUE.RANK.FIRST]: 0,
        [VALUE.RANK.SECOND]: 0,
        [VALUE.RANK.THIRD]: 0,
        [VALUE.RANK.FOURTH]: 0,
        [VALUE.RANK.FIFTH]: 0,
        [VALUE.RANK.LOSE]: 0,
      },
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

lottoApp;
