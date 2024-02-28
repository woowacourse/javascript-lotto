import { SETTING, RANKING } from '../constant/setting.js';
import LottoMachine from '../domain/LottoMachine.js';
import LottosManager from '../domain/LottosManager.js';
import elementHandler from '../handler/elementHandler.js';
import Validator from '../validator/Validator.js';
import View from '../view/view.js';

const $purchaseAmount = elementHandler.$('.purchase-input-box');
const $purchaseForm = elementHandler.$('.purchase-form');

class LottoGameController2 {
  #purchaseAmount;
  #lottos;

  play() {
    this.inputPurchaseAmount();
  }

  inputPurchaseAmount() {
    $purchaseForm.addEventListener('submit', (event) => {
      event.preventDefault();
      console.log($purchaseAmount.value);
      this.checkPurchaseAmount($purchaseAmount.value);
    });
  }

  checkPurchaseAmount(purchaseAmount) {
    try {
      Validator.validatePurchaseAmount(purchaseAmount);
      this.#purchaseAmount = purchaseAmount;
      this.#createRandomLottos(this.#purchaseAmount / SETTING.LOTTO_PRICE);
    } catch (error) {
      alert(error.message);
      $purchaseAmount.value = '';
    }
  }

  #createRandomLottos(lottoCount) {
    console.log(lottoCount);
    View.outputLottoCount(lottoCount);
    const lottoList = new LottoMachine(lottoCount).getLottoNumberList();
    this.#lottos = new LottosManager(lottoList);
  }

  // #calculateWinningResult(winningNumbers, bonusNumber) {
  //   const winningResults = this.#lottos.getWinningResults(winningNumbers, bonusNumber);
  //   OutputView.printWinningResults(winningResults);
  //   OutputView.printProfitRate(this.#calculateProfitRate(winningResults));
  // }

  // #calculateProfitRate(winningResults) {
  //   const totalProfit = Object.entries(winningResults).reduce((profit, [matchedKey, count]) => {
  //     return profit + RANKING[matchedKey].REWARD * count;
  //   }, 0);
  //   return ((totalProfit * 100) / this.#purchaseAmount).toLocaleString('ko-KR', { minimumFractionDigits: 1 });
  // }

  // #restartGame(restartCommand) {
  //   if (restartCommand === SETTING.RESTART_COMMAND) {
  //     this.play();
  //   }
  //   if (restartCommand === SETTING.EXIT_COMMAND) {
  //     OutputView.printExitMessage();
  //   }
  // }
}

export default LottoGameController2;
