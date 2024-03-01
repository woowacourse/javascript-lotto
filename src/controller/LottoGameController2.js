import { SETTING, RANKING } from '../constant/setting.js';
import LottoMachine from '../domain/LottoMachine.js';
import LottosManager from '../domain/LottosManager.js';
import elementHandler from '../handler/elementHandler.js';
import eventHandler from '../handler/eventHandler.js';
import Validator from '../validator/Validator.js';
import View from '../view/View.js';

const $purchaseAmount = elementHandler.$('.purchase-input-box');
const $purchaseForm = elementHandler.$('.purchase-form');

const $winningLottoForm = elementHandler.$('.winning-lotto-form');

const $modalBackground = elementHandler.$('#modal');
const $modalContent = elementHandler.$('.modal__content');
const $closeButton = elementHandler.$('.close-button');
const $restartButton = elementHandler.$('.restart-button');
class LottoGameController2 {
  #purchaseAmount;
  #lottosManager;
  #winningNumbers = [];
  #bonusNumber = 0;

  play() {
    this.#inputPurchaseAmount();
  }

  #inputPurchaseAmount() {
    $purchaseForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this.#checkPurchaseAmount($purchaseAmount.value);
    });
  }

  #checkPurchaseAmount(purchaseAmount) {
    try {
      Validator.validatePurchaseAmount(purchaseAmount);
      this.#purchaseAmount = purchaseAmount;
      this.#createRandomLottos();
    } catch (error) {
      alert(error.message);
      $purchaseAmount.value = '';
    }
  }

  #createRandomLottos() {
    const lottos = new LottoMachine(this.#purchaseAmount).getLottoNumberList();
    this.#lottosManager = new LottosManager(lottos);
    this.#showPurchasedLottos(lottos);
  }

  #showPurchasedLottos(lottos) {
    View.renderPurchasedLottos(lottos);
    View.renderWinningNumbersInput();
    this.#inputWinningLotto();
  }

  #inputWinningLotto() {
    const $winningInputs = elementHandler.$$('.lotto-input-box.winning');
    const $bonusInput = elementHandler.$('.lotto-input-box.bonus');

    $winningLottoForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const winningNumberList = [...$winningInputs].map((winningNumber) => Number(winningNumber.value));
      const bonusNumber = $bonusInput.value;
      this.#checkWinningNumbers(winningNumberList);
      this.#checkBonusNumber(bonusNumber, winningNumberList);
    });
  }

  #checkWinningNumbers(winningNumberList) {
    const $winningInputs = elementHandler.$$('.lotto-input-box.winning');
    const $bonusInput = elementHandler.$('.lotto-input-box.bonus');

    try {
      Validator.validateWinningNumberList(winningNumberList);
      this.#winningNumbers = winningNumberList;
    } catch (error) {
      alert(error.message);
      $winningInputs.forEach((winningNumber) => {
        winningNumber.value = '';
      });
      $bonusInput.value = '';
      $winningInputs[0].focus();
    }
  }

  #checkBonusNumber(bonusNumber, winningNumberList) {
    const $bonusInput = elementHandler.$('.lotto-input-box.bonus');

    try {
      Validator.validateBonusNumber(bonusNumber, winningNumberList);
      this.#bonusNumber = bonusNumber;
      this.#showResult();
      this.#bindCloseButton();
      this.#bindRestartButton();
    } catch (error) {
      alert(error.message);
      $bonusInput.value = '';
    }
  }

  #showResult() {
    const winningResults = this.#lottosManager.getWinningResults(this.#winningNumbers, this.#bonusNumber);
    const profitRate = this.#calculateProfitRate(winningResults);
    View.renderWinningResults(winningResults, profitRate);
  }

  #calculateProfitRate(winningResults) {
    const totalProfit = Object.entries(winningResults).reduce((profit, [matchedKey, count]) => {
      return profit + RANKING[matchedKey].REWARD * count;
    }, 0);
    return ((totalProfit * 100) / this.#purchaseAmount).toFixed(1);
  }

  #bindCloseButton() {
    eventHandler.onModalClose($closeButton, $modalBackground, $modalContent, View.renderCloseModal);
  }

  #bindRestartButton() {
    eventHandler.onRestart($restartButton, () => {
      $purchaseAmount.value = '';
      View.renderRestartGame();
    });
  }
}

export default LottoGameController2;
