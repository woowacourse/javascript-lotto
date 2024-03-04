import { SETTING, RANKING } from '../constant/setting.js';
import LottoMachine from '../domain/LottoMachine.js';
import LottosManager from '../domain/LottosManager.js';
import elementHandler from '../handler/elementHandler.js';
import Validator from '../validator/Validator.js';
import View from '../view/View.js';

const $purchaseAmount = elementHandler.$('.purchase-input');
const $purchaseForm = elementHandler.$('.purchase-form');

const $winningLottoForm = elementHandler.$('.winning-lotto-form');

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
      this.#purchaseAmount = Number(purchaseAmount);
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
    const $winningInputs = elementHandler.$$('.lotto-input.winning');
    const $bonusInput = elementHandler.$('.lotto-input.bonus');

    $winningLottoForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const winningNumberList = [...$winningInputs].map((winningNumber) => Number(winningNumber.value));
      const bonusNumber = Number($bonusInput.value);
      this.#checkWinningNumbers(winningNumberList);
      this.#checkBonusNumber(bonusNumber, winningNumberList);
    });
  }

  #checkWinningNumbers(winningNumberList) {
    const $winningInputs = elementHandler.$$('.lotto-input.winning');

    try {
      Validator.validateWinningNumberList(winningNumberList);
      this.#winningNumbers = winningNumberList;
    } catch (error) {
      alert(error.message);
      $winningInputs[0].focus();
    }
  }

  #checkBonusNumber(bonusNumber, winningNumberList) {
    try {
      Validator.validateBonusNumber(bonusNumber, winningNumberList);
      this.#bonusNumber = bonusNumber;
      this.#showResult();
    } catch (error) {
      alert(error.message);
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
}

export default LottoGameController2;
