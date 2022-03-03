import LottoVendor from '../model/LottoVendor.js';
import LottoResult from '../model/LottoResult.js';
import PurchaseView from '../view/PurchaseView.js';
import IssuedTicketView from '../view/IssuedTicketView.js';
import WinningNumbersView from '../view/WinningNumbersView.js';
import ResultModalView from '../view/ResultModalView.js';
import { moneyValidator } from '../validator/moneyValidator.js';
import { on } from '../utils/event.js';
import insertAutoComma from '../utils/autoComma.js';
import EVENT from '../constants/event.js';
import LOTTO from '../constants/lotto.js';
import EXCEPTION from '../constants/exception.js';

export default class LottoController {
  constructor() {
    this.lottoVendor = new LottoVendor();
    this.lottoResult = new LottoResult(this.lottoVendor);
    this.purchaseView = new PurchaseView();
    this.issuedTicketView = new IssuedTicketView();
    this.winningNumbersView = new WinningNumbersView();
    this.resultModalView = new ResultModalView();
    this.#subscribeViewEvents();
  }

  #subscribeViewEvents() {
    on(this.purchaseView.$purchaseForm, EVENT.SUBMIT_PURCHASE, (e) => this.#purchaseLotto(e.detail.money));
    on(this.issuedTicketView.$lottoNumberToggle, EVENT.TOGGLE_LOTTO_DETAIL, (e) =>
      this.#toggleDetails(e.detail.checked),
    );
    on(this.winningNumbersView.$winningNumbersForm, EVENT.SUBMIT_RESULT, (e) =>
      this.#requestResult(e.detail.winningNumbers, e.detail.bonusNumber),
    );
    on(this.resultModalView.$restartButton, EVENT.CLICK_RESTART, () => this.#restart());
    on(this.purchaseView.$purchaseInput, EVENT.PURCHASE_KEYUP, (e) => this.#keyupHandler(e.detail.target));
  }

  #purchaseLotto(userInputMoney) {
    try {
      this.lottoVendor.paidMoney = LottoVendor.settleMoney(userInputMoney);
      this.lottoVendor.createLottos();
      const issuedLottos = [...this.lottoVendor.lottos];
      this.issuedTicketView.showTicketContainer();
      this.issuedTicketView.renderTicketCount(issuedLottos.length);
      this.issuedTicketView.renderIssuedTickets(issuedLottos);
      this.purchaseView.togglePurchasableLottoCountDisplay();
      this.purchaseView.deactivatePurchaseForm();
    } catch (error) {
      alert(error.message);
    }
  }

  #toggleDetails(checked) {
    if (checked) {
      this.issuedTicketView.showTicketDetails();
      return;
    }

    this.issuedTicketView.hideTicketDetails();
  }

  #validateLottoList() {
    // TODO: 제거
    if (this.lottoVendor.isLottoListEmpty()) {
      throw new Error(EXCEPTION.NOT_YET_PURCHASE);
    }
  }

  #requestResult(winningNumbers, bonusNumber) {
    try {
      this.#validateLottoList(); // TODO: 제거
      this.lottoResult.bonusNumber = bonusNumber;
      this.lottoResult.winningNumbers = winningNumbers;
      const { winningCounts, lottoYield, winningMoney } = this.lottoResult.getLottoResult(winningNumbers, bonusNumber);
      this.#renderResultModal(winningCounts, lottoYield, winningMoney);
    } catch (error) {
      alert(error.message);
    }
  }

  #renderResultModal(winningCounts, lottoYield, winningMoney) {
    this.resultModalView.renderYield(this.lottoVendor.paidMoney, winningMoney, lottoYield);
    this.resultModalView.renderWinningCounts(winningCounts);
    this.resultModalView.toggleModalDisplay();
  }

  #restart() {
    this.resultModalView.toggleModalDisplay();
    this.lottoVendor = new LottoVendor();
    this.lottoResult = new LottoResult(this.lottoVendor);
    this.issuedTicketView.hideTicketContainer();
    this.winningNumbersView.removeInputValue();
    this.purchaseView.removeInputValue();
    this.purchaseView.activatePurchaseForm();
    this.purchaseView.togglePurchasableLottoCountDisplay();
  }

  #keyupHandler(target) {
    try {
      const moneyNumber = parseInt(target.value.replace(/,/g, ''), 10);
      this.#preventGettingOverLimit(moneyNumber);
      insertAutoComma(target);
      this.purchaseView.renderPurchasableLottoCount(Math.floor(moneyNumber / LOTTO.PRICE_PER_TICKET) ?? 0);
    } catch (error) {
      alert(error.message);
    }
  }

  #preventGettingOverLimit(value) {
    if (moneyValidator.isOverMaximum(value)) {
      this.purchaseView.stopInputTyping(value);
      throw new Error(EXCEPTION.INVALID_RANGE.MAXIMUM);
    }
  }
}
