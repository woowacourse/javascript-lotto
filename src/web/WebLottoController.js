import LotteryMachine from '../domain/services/LotteryMachine.js';
import WebInputView from './views/WebInputView.js';
import { purchaseAmountForm } from './DOM/objects.js';

class WebLottoController {
  #lottery;

  run() {
    purchaseAmountForm.addEventListener('submit', event => {
      const purchaseAmount = WebInputView.readPurchaseAmount(event);
    });
  }
}

export default WebLottoController;
