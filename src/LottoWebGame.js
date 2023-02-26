import Lotto from './domain/models/Lotto';
import lottoGameValidator from './domain/lottoGameValidator';
import generateRandomNumber from './utils/generateRandomNumber';
import { LOTTO, RANKING_THRESHOLD } from './constants';
import { $, $$ } from './dom/dom';
import render from './render';
import lottoGameCalculator from './domain/lottoGameCalculator';

class LottoWebGame {
  constructor() {
    this.lottos = [];
  }

  play() {
    this.initAddEventListener();
  }

  renderPurchasedLotto() {
    const lottosNumbers = this.lottos.map((lotto) => lotto.getNumbers());
    render.purchasedLotto(lottosNumbers);
  }

  renderStatistics(winningNumbers, bonusNumber) {
    const purchaseAmount = this.lottos.length * LOTTO.price;
    const rankings = this.makeRankings(winningNumbers, bonusNumber);
    const rewardRate = lottoGameCalculator.calculateRewardRate(purchaseAmount, rankings);

    render.statistics(rankings, rewardRate);
  }

  makeRankings(winningNumbers, bonusNumber) {
    const rankings = [];
    this.lottos.forEach((lotto) => {
      const matchCount = lotto.calculateMatchCount(winningNumbers);
      if (matchCount < RANKING_THRESHOLD) return;
      const ranking = lotto.calculateRanking(matchCount, bonusNumber);
      rankings.push(ranking);
    });

    return rankings;
  }

  buyLottos(purchaseAmount) {
    this.lottos = [];

    new Array(purchaseAmount / LOTTO.price).fill().forEach(() => {
      this.lottos.push(this.publishLotto());
    });
  }

  publishLotto() {
    return new Lotto(this.generateLottoNumbers());
  }

  generateLottoNumbers() {
    const lottoNumbers = [];
    while (lottoNumbers.length < LOTTO.numbersLength) {
      const number = generateRandomNumber(LOTTO.minNumber, LOTTO.maxNumber);
      if (!lottoNumbers.includes(number)) lottoNumbers.push(number);
    }

    return lottoNumbers.sort((a, b) => a - b);
  }

  handleSubmitPurchaseAmount(event) {
    event.preventDefault();
    const $purchaseAmount = $('#purchase-amount');

    const purchaseAmount = $purchaseAmount.value;
    try {
      lottoGameValidator.checkPruchaseAmount(purchaseAmount);
      this.buyLottos(purchaseAmount);
      this.renderPurchasedLotto();
      render.winningLottoForm();
    } catch (error) {
      window.alert(error);
      $purchaseAmount.value = '';
    }
  }

  getWinningNumbers() {
    return Array.from($$('#winning-lotto-from input[name="winning-number"]')).map((input) =>
      Number(input.value)
    );
  }

  getBonusNumber() {
    return Number($('#winning-lotto-from input[name=bonus-number]').value);
  }

  handleSubmitWinningLotto(event) {
    event.preventDefault();

    const winningNumbers = this.getWinningNumbers();
    const bonusNumber = this.getBonusNumber();
    try {
      lottoGameValidator.checkWinningNumbers(String(winningNumbers));
      lottoGameValidator.checkBonusNumber(Number(bonusNumber), winningNumbers);
      this.renderStatistics(winningNumbers, bonusNumber);
    } catch (error) {
      window.alert(error);
    }
  }

  restartLottoGame({ target }) {
    if (!target.matches('button')) return;

    this.lottos = [];
    $('#purchase-amount').value = '';
    render.restart();
  }

  exitStatistics({ target }) {
    if (!target.matches('#winning-statistics-out-button')) return;

    render.removeElement('#winning-statistics');
  }

  initAddEventListener() {
    $('#purchase-amount-form').addEventListener(
      'submit',
      this.handleSubmitPurchaseAmount.bind(this)
    );
    $('#winning-lotto-from').addEventListener('submit', this.handleSubmitWinningLotto.bind(this));
    $('#winning-statistics').addEventListener('click', this.restartLottoGame.bind(this));
    $('#winning-statistics').addEventListener('click', this.exitStatistics.bind(this));
  }
}

export default LottoWebGame;
