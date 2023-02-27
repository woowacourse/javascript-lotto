import Lotto from './domain/models/Lotto';
import lottoGameValidator from './domain/lottoGameValidator';
import lottoGameCalculator from './domain/lottoGameCalculator';
import randomShuffle from './utils/randomShuffle';
import { $, $$ } from './utils/dom';
import { LOTTO, RANKING_THRESHOLD } from './constants';
import {
  renderBuyMessage,
  renderLottoInputErrorMessage,
  renderLottos,
  renderResultModal,
} from './view/render';

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

  handleBuyButton = () => {
    try {
      const purchaseAmount = this.getPurchaseAmount();
      this.initLottos(purchaseAmount);
      renderLottos(this.#lottos.map((lotto) => lotto.getNumbers()));
      renderBuyMessage('성공적으로 구매되었습니다!', 'black');
      $('.hidden-area').classList.add('show');
    } catch (e) {
      renderBuyMessage(e.message, 'red');
    }
  };

  getPurchaseAmount = () => {
    const purchaseAmount = $('#purchase-amount').value;
    lottoGameValidator.checkPurchaseAmount(purchaseAmount);
    return Number(purchaseAmount);
  };

  handleResultButton = () => {
    try {
      const { winningNumbers, bonusNumber } = this.getLottoInputs();
      const rankings = this.makeRankings(winningNumbers, bonusNumber);
      const rewardRate = lottoGameCalculator.calculateRewardRate(this.#lottos.length * LOTTO.price, rankings);
      renderResultModal(rankings, rewardRate);
      renderLottoInputErrorMessage('올바른 당첨 번호입니다!', 'black');
      this.toggleResultModal();
    } catch (e) {
      renderLottoInputErrorMessage(e.message, 'red');
    }
  };

  getLottoInputs = () => {
    const winningNumbers = Array.from($$('.winning-numbers > input')).map(($input) => Number($input.value));
    const bonusNumber = $('.bonus-number > input').value;
    lottoGameValidator.checkLottoNumbers(winningNumbers);
    lottoGameValidator.checkBonusNumber(bonusNumber, winningNumbers);
    return { winningNumbers, bonusNumber: Number(bonusNumber) };
  };

  handleReplayButton = () => {
    this.#lottos = [];
    $('.hidden-area').classList.remove('show');
    $('#purchase-amount').value = '';
    $$('.winning-numbers > input').forEach(($input) => {
      $input.value = '';
    });
    $('.bonus-number > input').value = '';
    renderBuyMessage();
    renderLottoInputErrorMessage();
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
