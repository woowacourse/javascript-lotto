import LotteryMachine from '../domain/services/LotteryMachine';
import WebInputView from './views/WebInputView';
import { purchaseResult, purchaseAmountForm, purchaseLottoList, winningNumbersForm } from './DOM/objects';
import WebOutputView from './views/WebOutputView';
import { CONFIG_FORMAT, CONFIG_LOTTO } from '../constants/config';

class WebLottoController {
  #purchaseAmount;
  #lottery;

  constructor(purchaseAmount) {
    this.#purchaseAmount = purchaseAmount;
  }

  run() {
    this.#lottery = new LotteryMachine(this.#purchaseAmount).makeLottery();
    this.showPurchasedResult(this.#purchaseAmount / CONFIG_LOTTO.PURCHASE_UNIT);
    this.renderWinningNumbersForm();
  }

  showPurchasedResult(amount) {
    const message = `총 ${amount}개를 구매하였습니다.`;
    WebOutputView.printMessage(purchaseResult, message);
    const lottoList = this.#lottery.map(lotto => {
      return `<li><span>🎟️</span>${lotto.numberList.join(CONFIG_FORMAT.JOIN_SEPARATOR)}</li>`;
    });
    WebOutputView.printMessage(purchaseLottoList, lottoList.join(''));
  }

  renderWinningNumbersForm() {
    const winningNumbersFormHTML = `<label>지난주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</label>
    <div id="winning-numbers-input-field">
      <div id="winning-numbers-container">
        <span>당첨 번호</span>
        <div id="winning-numbers-inputs">
          <input type="number" class="winning-number-input" required />
          <input type="number" class="winning-number-input" required />
          <input type="number" class="winning-number-input" required />
          <input type="number" class="winning-number-input" required />
          <input type="number" class="winning-number-input" required />
          <input type="number" class="winning-number-input" required />
        </div>
      </div>
      <div id="bonus-number-container">
        <label>보너스 번호</label>
        <input type="number" id="bonus-number-input" required />
      </div>
    </div>
    <button type="submit" id="winning-numbers-submit-button">결과 확인하기</button>`;
    WebOutputView.printMessage(winningNumbersForm, winningNumbersFormHTML);
  }
}

export default WebLottoController;
