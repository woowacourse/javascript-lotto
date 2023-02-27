import lottoGameValidator from './domain/lottoGameValidator';
import render from './render';
import lottoGameCalculator from './domain/lottoGameCalculator';
import LottoMachine from './domain/models/LottoMachine';
import { $, $$ } from './dom/dom';
import { LOTTO } from './constants';

class LottoWebGame {
  constructor() {
    this.lottos = [];
    this.lottoMachine = new LottoMachine();
    this.keydown = false;
  }

  play() {
    this.initAddEventListener();
  }

  renderPurchasedLotto() {
    render.purchasedLotto(this.lottoMachine.getLottosNumbers());
  }

  renderStatistics(winningNumbers, bonusNumber) {
    const purchaseAmount = this.lottoMachine.getLottosCount() * LOTTO.price;
    const rankings = this.lottoMachine.getRankings(winningNumbers, bonusNumber);
    const rewardRate = lottoGameCalculator.calculateRewardRate(purchaseAmount, rankings);

    render.statistics(rankings, rewardRate);
  }

  handleSubmitPurchaseAmount(event) {
    event.preventDefault();
    const $purchaseAmount = $('#purchase-amount');

    const purchaseAmount = $purchaseAmount.value;
    try {
      lottoGameValidator.checkPruchaseAmount(purchaseAmount);
      this.lottoMachine.buyLottos(purchaseAmount);
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
      this.keydown = true;
    } catch (error) {
      window.alert(error);
    }
  }

  restartLottoGame({ target }) {
    if (!target.matches('button')) return;

    this.lottoMachine.restartLottoGame();
    $('#purchase-amount').value = '';
    render.restart();
  }

  exitStatistics({ target }) {
    if (!target.matches('#winning-statistics-out-button')) return;

    render.removeElement('#winning-statistics');
  }

  handleKeydownEscape({ code }) {
    if (!this.keydown) return;
    if (code !== 'Escape') return;

    render.removeElement('#winning-statistics');
    this.keydown = false;
  }

  initAddEventListener() {
    $('#purchase-amount-form').addEventListener(
      'submit',
      this.handleSubmitPurchaseAmount.bind(this)
    );
    $('#winning-lotto-from').addEventListener('submit', this.handleSubmitWinningLotto.bind(this));
    $('#winning-statistics').addEventListener('click', this.restartLottoGame.bind(this));
    $('#winning-statistics').addEventListener('click', this.exitStatistics.bind(this));
    document.addEventListener('keydown', this.handleKeydownEscape.bind(this));
  }
}

export default LottoWebGame;
