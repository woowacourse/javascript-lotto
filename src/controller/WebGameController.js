import { calculateMatchingResult } from '../service/MatchingService.js';
import { calculateProfitRate } from '../service/ProfitService.js';
import { purchaseLottos } from '../service/PurchaseService.js';
import validatePrice from '../validation/validatePrice.js';

class WebGameController {
  constructor() {
    this.lottoArray = [];
  }

  handlePurchase(event) {
    event.preventDefault();

    try {
      const priceValue = getPriceInput();
      validatePrice(priceValue);

      const { lottoArray, lottoCount } = purchaseLottos(priceValue);
      this.lottoArray = lottoArray;

      this.updatePurchaseView(lottoCount, lottoArray);
      disableButton(document.querySelector('.purchase-form__button'));
    } catch (error) {
      console.error(`❌ 오류 발생: ${error.message}`);
    }
  }

  handleWinningSubmit(event) {
    event.preventDefault();

    try {
      const { winningNumbers, bonusNumber } = getWinningNumbers();
      const matchingResult = calculateMatchingResult(winningNumbers, bonusNumber, this.lottoArray);
      const profitRate = calculateProfitRate(matchingResult, this.lottoArray.length);

      showModal(matchingResult, profitRate);
    } catch (error) {
      console.error(`❌ 오류 발생: ${error.message}`);
    }
  }

  handleRestartGame() {
    resetForm();
    this.lottoArray = [];
    enableAllButtons();
    closeModal();
  }

  updatePurchaseView(lottoCount, lottoArray) {
    showLottoCount(lottoCount);
    showLottoTickets(lottoArray);
  }
}

export default WebGameController;
