import LottoBundle from '../model/LottoBundle.js';
import IssuedTicketView from '../view/IssuedTicketView.js';
import PurchaseView from '../view/PurchaseView.js';
import ResultView from '../view/resultView.js';
import StatisticsView from '../view/statisticsView.js';
import { on } from '../utils/event.js';
import LOTTO from '../constants/lotto.js';
import CUSTOM_EVENT from '../constants/event.js';
import { validateMoney } from '../validator/moneyValidator.js';
import { validatePrizeNumber } from '../validator/prizeNumberValidator.js';

export default class LottoController {
  constructor() {
    this.model = new LottoBundle();
    this.purchaseView = new PurchaseView();
    this.issuedTicketView = new IssuedTicketView();
    this.resultView = new ResultView();
    this.statisticsView = new StatisticsView();
  }

  subscribeViewEvents() {
    on(this.purchaseView.$purchaseForm, CUSTOM_EVENT.PURCHASE, (e) =>
      this.purchaseLotto(e.detail.money),
    );

    on(this.issuedTicketView.$lottoNumberToggle, CUSTOM_EVENT.TOGGLE, (e) =>
      this.toggleDetails(e.detail.checked),
    );

    on(this.resultView.$resultForm, CUSTOM_EVENT.CHECK_RESULT, (e) =>
      this.checkResult(e.detail.numbers),
    );
  }

  purchaseLotto(money) {
    try {
      validateMoney(money);
      const count = money / LOTTO.PRICE_PER_TICKET;
      this.model.createLottoBundle(count);
      this.renderLotto(count);
      this.renderResult();
    } catch (error) {
      alert(error.message);
    }
  }

  toggleDetails(checked) {
    if (checked) {
      this.issuedTicketView.showTicketDetails();
      return;
    }

    this.issuedTicketView.hideTicketDetails();
  }

  checkResult(numbers) {
    try {
      validatePrizeNumber([...numbers.prizeNumbers, numbers.bonusNumber]);
      this.statisticsView.showStatisticsModal();
    } catch (error) {
      alert(error.message);
    }
  }

  renderLotto(count) {
    this.issuedTicketView.showTicketContainer();
    this.issuedTicketView.renderTicketCount(count);
    this.issuedTicketView.renderIssuedTickets(this.model.lottos);
    this.purchaseView.deactivatePurchaseForm();
  }

  renderResult() {
    this.resultView.showResultView();
  }
}
