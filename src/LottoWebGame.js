import Lotto from './domain/models/Lotto';
import { LOTTO } from './constants';

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
  };

  handleBuyButton = () => {
    const input = $('#purchase-amount').value;
    try {
      lottoGameValidator.checkPurchaseAmount(input);
      this.initLottos(Number(input));
      this.renderLottos();
      $('.hidden-area').classList.add('show');
    } catch (e) {
      alert(e.message);
    }
  };

  handleResultButton = () => {
    const winningNumbers = Array.from($$('.winning-numbers > input')).map(($input) =>
      Number($input.value)
    );
    const bonusNumber = $('.bonus-number > input').value;
    try {
      lottoGameValidator.checkLottoNumbers(winningNumbers);
      lottoGameValidator.checkBonusNumber(bonusNumber, winningNumbers);
      this.renderResultModal(this.makeRankings(winningNumbers, Number(bonusNumber)));
      this.toggleResultModal();
    } catch (e) {
      alert(e.message);
    }
  };

  handleReplayButton = () => {
    this.#lottos = [];
    $('.hidden-area').classList.remove('show');
    $('#purchase-amount').value = '';
    $$('.winning-numbers > input').forEach((input) => {
      input.value = '';
    });
    $('.bonus-number > input').value = '';
    this.toggleResultModal();
  };

  initLottos = (purchaseAmount) => {
    this.#lottos = Array.from({ length: purchaseAmount / LOTTO.price }, this.drawLotto);
  };

  drawLotto = () => {
    const randomNumbers = Array.from(
      { length: LOTTO.maxNumber - LOTTO.minNumber + 1 },
      (_, i) => i + LOTTO.minNumber
    )
      .sort(() => Math.random() - 0.5)
      .slice(0, LOTTO.numbersLength)
      .sort((a, b) => a - b);

    return new Lotto(randomNumbers);
  };

  renderLottos = () => {
    $('#buy-count').innerHTML = `총 ${this.#lottos.length}개를 구매하였습니다.`;
    $('#lotto-numbers-area').innerHTML = this.#lottos
      .map((lotto) => `<p>${lotto.getNumbers().join(', ')}</p>`)
      .join('');
  };

  renderResultModal = (rankings) => {
    [1, 2, 3, 4, 5].forEach((ranking) => {
      const rankingCount = rankings.reduce((acc, cur) => (acc += cur === ranking), 0);
      $(`#ranking-${ranking}`).innerHTML = `${rankingCount}개`;
    });

    const purchaseAmount = this.#lottos.length * LOTTO.price;
    const rewardRate = lottoGameCalculator.calculateRewardRate(purchaseAmount, rankings);
    $('#reward-rate').innerHTML = `당신의 총 수익률은 ${rewardRate}입니다.`;
  };

  makeRankings = (winningNumbers, bonusNumber) => {
    return this.#lottos
      .filter((lotto) => lotto.calculateMatchCount(winningNumbers) >= RANKING_THRESHOLD)
      .map((lotto) =>
        lotto.calculateRanking(lotto.calculateMatchCount(winningNumbers), bonusNumber)
      );
  };

  toggleResultModal = () => {
    $('#result-modal').classList.toggle('show');
  };
}

export default LottoWebGame;
