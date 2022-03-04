import LottoBundle from '../model/LottoBundle.js';
import LottoPrize from '../model/LottoPrize.js';
import IssuedTicketView from '../view/IssuedTicketView.js';
import PurchaseView from '../view/PurchaseView.js';
import ResultView from '../view/resultView.js';
import StatisticsView from '../view/statisticsView.js';
import { on } from '../utils/event.js';
import LOTTO from '../constants/lotto.js';
import CUSTOM_EVENT from '../constants/event.js';
import { validateMoney } from '../validator/moneyValidator.js';
import { validatePrizeNumber } from '../validator/prizeNumberValidator.js';
import returnSameNumberCount from '../utils/compareArray.js';

export default class LottoController {
  constructor() {
    this.lottoBundleModel = new LottoBundle();
    this.lottoPrizeModel = new LottoPrize();

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

    on(this.statisticsView.$restartButton, CUSTOM_EVENT.RESTART, () =>
      this.restart(),
    );
  }

  purchaseLotto(money) {
    try {
      validateMoney(money);
      const count = money / LOTTO.PRICE_PER_TICKET;
      this.lottoBundleModel.createLottoBundle(count);
      this.renderLotto(count);
      this.resultView.showResultView();
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
      this.calculateResult(numbers);
      this.statisticsView.showStatisticsModal();
      this.statisticsView.renderStatistics(
        this.lottoPrizeModel.prizeCount,
        this.lottoPrizeModel.rateOfReturn,
      );
    } catch (error) {
      alert(error.message);
    }
  }

  renderLotto(count) {
    this.issuedTicketView.showTicketContainer();
    this.issuedTicketView.renderTicketCount(count);
    this.issuedTicketView.renderIssuedTickets(this.lottoBundleModel.lottos);
    this.purchaseView.deactivatePurchaseForm();
  }

  calculateResult(numbers) {
    if (this.lottoPrizeModel.isCalculated) {
      return;
    }

    this.lottoPrizeModel.setIsCalculated();
    this.lottoBundleModel.lottos.forEach((lotto) => {
      this.lottoPrizeModel.countPrize(
        returnSameNumberCount(lotto.numbers, numbers.prizeNumbers),
        lotto.numbers,
        numbers.bonusNumber,
      );
    });
    this.lottoPrizeModel.calculateRateOfReturn(
      this.lottoBundleModel.lottos.length * LOTTO.PRICE_PER_TICKET,
    );
  }

  restart() {
    this.lottoBundleModel.initialize();
    this.lottoPrizeModel.initialize();
    this.purchaseView.rerenderView();
    this.issuedTicketView.rerenderView();
    this.resultView.rerenderView();
    this.statisticsView.hideStatisticsModal();
  }
}
