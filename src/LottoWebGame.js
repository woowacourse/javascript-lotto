import Lotto from './domain/models/Lotto';
import lottoGameValidator from './domain/lottoGameValidator';
import generateRandomNumber from './utils/generateRandomNumber';
import { LOTTO, RANKING_THRESHOLD } from './constants';
import { $, $$ } from './dom/dom';
import render from './render';
import lottoGameCalculator from './domain/lottoGameCalculator';

const $purchaseInput = $('#purchase-amount-form input[type=text]');

const LottoWebGame = function () {
  this.lottos = [];

  this.init = () => {
    initAddEventListener();
  };

  const renderPurchasedLotto = () => {
    const lottosNumbers = this.lottos.map((lotto) => lotto.getNumbers());
    render.purchasedLotto(lottosNumbers);
  };

  const renderStatistics = (winningNumbers, bonusNumber) => {
    const purchaseAmount = this.lottos.length * LOTTO.price;
    const rankings = makeRankings(winningNumbers, bonusNumber);
    const rewardRate = lottoGameCalculator.calculateRewardRate(purchaseAmount, rankings);

    render.showElement('.winning-statistics');
    render.statistics(rankings, rewardRate);
  };

  const makeRankings = (winningNumbers, bonusNumber) => {
    const rankings = [];
    this.lottos.forEach((lotto) => {
      const matchCount = lotto.calculateMatchCount(winningNumbers);
      if (matchCount < RANKING_THRESHOLD) return;
      const ranking = lotto.calculateRanking(matchCount, bonusNumber);
      rankings.push(ranking);
    });

    return rankings;
  };

  const buyLottos = (purchaseAmount) => {
    this.lottos = [];

    new Array(purchaseAmount / LOTTO.price).fill().forEach(() => {
      this.lottos.push(publishLotto());
    });
  };

  const publishLotto = () => {
    return new Lotto(generateLottoNumbers());
  };

  const generateLottoNumbers = () => {
    const lottoNumbers = [];
    while (lottoNumbers.length < LOTTO.numbersLength) {
      const number = generateRandomNumber(LOTTO.minNumber, LOTTO.maxNumber);
      if (!lottoNumbers.includes(number)) lottoNumbers.push(number);
    }

    return lottoNumbers.sort((a, b) => a - b);
  };

  const handleSubmitPurchaseAmount = (event) => {
    event.preventDefault();

    const purchaseAmount = $purchaseInput.value;
    try {
      lottoGameValidator.checkPruchaseAmount(purchaseAmount);
      buyLottos(purchaseAmount);
      renderPurchasedLotto();
      render.winningLottoForm();
    } catch (error) {
      window.alert(error);
      $purchaseInput.value = '';
    }
  };

  const getWinningNumbers = () => {
    return Array.from($$('#winning-lotto-from input[name="winning-number"]')).map((input) =>
      Number(input.value)
    );
  };

  const getBonusNumber = () => {
    return Number($('#winning-lotto-from input[name=bonus-number]').value);
  };

  const handleSubmitWinningLotto = (event) => {
    event.preventDefault();

    const winningNumbers = getWinningNumbers();
    const bonusNumber = getBonusNumber();
    try {
      lottoGameValidator.checkWinningNumbers(String(winningNumbers));
      lottoGameValidator.checkBonusNumber(Number(bonusNumber), winningNumbers);
      renderStatistics(winningNumbers, bonusNumber);
    } catch (error) {
      window.alert(error);
    }
  };

  const restartLottoGame = ({ target }) => {
    if (!target.matches('button')) return;

    this.lottos = [];
    $purchaseInput.value = '';
    render.hideElement('.winning-statistics');
    render.restart();
  };

  const exitStatistics = ({ target }) => {
    if (!target.matches('#winning-statistics-out-button')) return;

    render.hideElement('.winning-statistics');
  };

  const initAddEventListener = () => {
    $('#purchase-amount-form').addEventListener('submit', handleSubmitPurchaseAmount);
    $('#winning-lotto-from').addEventListener('submit', handleSubmitWinningLotto);
    $('.winning-statistics').addEventListener('click', restartLottoGame);
    $('.winning-statistics').addEventListener('click', exitStatistics);
  };
};

export default LottoWebGame;
