import Lotto from './domain/models/Lotto';
import lottoGameValidator from './domain/lottoGameValidator';
import lottoGameCalculator from './domain/lottoGameCalculator';
import randomShuffle from './utils/randomShuffle';
import { $, $$ } from './utils/dom';
import { LOTTO, RANKING_THRESHOLD } from './constants';
import { renderLottos, renderResultModal } from './view/render';

class LottoWebGame {
  #lottos;

  constructor() {
    this.#lottos = [];
    this.bindEvents();
  }

  bindEvents = () => {
    $('#buy-button').addEventListener('click', this.handleBuyButton);
    $('#result-button').addEventListener('click', this.handleResultButton);
    $('#replay-button').addEventListener('click', this.handleReplayButton);
    $('#out').addEventListener('click', this.toggleResultModal);
    $$('.lotto-input input').forEach(($input) => {
      $input.addEventListener('input', this.handleInputMaxLength);
    });
  };

  handleValidate = (validator, value) => {
    try {
      validator(value);
    } catch (e) {
      alert(e.message);
    }
  };

  handleBuyButton = () => {
    const purchaseAmount = $('#purchase-amount').value;
    this.handleValidate(lottoGameValidator.checkPurchaseAmount, purchaseAmount);
    this.initLottos(Number(purchaseAmount));
    renderLottos(this.#lottos.map((lotto) => lotto.getNumber()));
    $('.hidden-area').classList.add('show');
  };

  handleResultButton = () => {
    const winningNumbers = Array.from($$('.winning-numbers > input')).map(($input) => Number($input.value));
    const bonusNumber = $('.bonus-number > input').value;
    this.handleValidate(lottoGameValidator.checkLottoNumber, winningNumbers);
    this.handleValidate(lottoGameValidator.checkBonusNumber, bonusNumber);
    const rankings = this.makeRankings(winningNumbers, Number(bonusNumber));
    const rewardRate = lottoGameCalculator.calculateRewardRate(this.#lottos.length * LOTTO.price, rankings);
    renderResultModal(rankings, rewardRate);
    this.toggleResultModal();
  };

  handleReplayButton = () => {
    this.#lottos = [];
    $('.hidden-area').classList.remove('show');
    $('#purchase-amount').value = '';
    $$('.winning-numbers > input').forEach(($input) => {
      $input.value = '';
    });
    $('.bonus-number > input').value = '';
    this.toggleResultModal();
  };

  initLottos = (purchaseAmount) => {
    this.#lottos = Array.from({ length: purchaseAmount / LOTTO.price }, this.drawLotto);
  };

  drawLotto = () => {
    const randomNumbers = randomShuffle(
      Array.from({ length: LOTTO.maxNumber - LOTTO.minNumber + 1 }, (_, i) => i + LOTTO.minNumber)
    )
      .slice(0, LOTTO.numbersLength)
      .sort((a, b) => a - b);

    return new Lotto(randomNumbers);
  };

  makeRankings = (winningNumbers, bonusNumber) => {
    return this.#lottos
      .filter((lotto) => lotto.calculateMatchCount(winningNumbers) >= RANKING_THRESHOLD)
      .map((lotto) => lotto.calculateRanking(lotto.calculateMatchCount(winningNumbers), bonusNumber));
  };

  toggleResultModal = () => {
    $('#result-modal').classList.toggle('show');
  };

  handleInputMaxLength = (e) => {
    e.target.value = e.target.value.slice(0, 2);
  };
}

export default LottoWebGame;
