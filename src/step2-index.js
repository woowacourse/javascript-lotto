import WebView from "./view/WebView.js";
import WebInput from "./WebInput.js";
import LottoMachine from "./model/LottoMachine.js";
import Profit from "./model/Profit.js";
import Rank from "./model/Rank.js";
import { ERROR_MESSAGES } from "./constants.js";

class App {
  constructor() {
    this.view = new WebView();
    this.input = new WebInput();
    this.lottos = [];
    this.purchaseAmount = 0;
  }

  run() {
    this.view.onPurchaseSubmit(() => {
      try {
        const purchaseAmount = this.input.getPurchaseAmount();

        const lottoMachine = new LottoMachine(purchaseAmount);
        this.lottos = lottoMachine.issuedLottos();
        this.purchaseAmount = purchaseAmount;

        this.view.showPurchaseResult(this.lottos.length, this.lottos);
      } catch (error) {
        this.lottos = [];
        this.purchaseAmount = 0;
        this.view.showError(error.message);
      }
    });

    this.view.onResultClick(() => {
      try {
        if (this.lottos.length === 0) {
          throw new Error(ERROR_MESSAGES.PURCHASE_AMOUNT.EMPTY);
        }

        const winningNumbers = this.input.getWinningNumbers();
        const bonusNumber = this.input.getBonusNumber(winningNumbers);

        const rank = new Rank(this.lottos, winningNumbers, [bonusNumber]);
        const stats = rank.calculateStats();
        const profitRate = Profit.calculateProfit(this.purchaseAmount, stats);

        this.view.showStats(stats, profitRate);
      } catch (error) {
        this.view.showError(error.message);
        this.view.hideModal();
      }
    });

    this.view.onRestartClick(() => {
      this.lottos = [];
      this.purchaseAmount = 0;
      this.view.reset();
    });

    this.view.onModalClose(() => {
      this.view.hideModal();
    });
  }
}

const app = new App()
app.run();
