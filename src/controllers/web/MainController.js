import Purchase from "../../models/Purchase";
import WinningLottoManager from "../../models/winningLottoManager";
import LottoMachine from "../../services/LottoMachine";
import LottoResult from "../../services/LottoResult";
import LottosOutputView from "../../views/web/js/LottosOutputView";
import PurchaseInputView from "../../views/web/js/PurchaseInputView";
import ResultOutputView from "../../views/web/js/ResultOutputView";
import WinningInputView from "../../views/web/js/WinningInputView";

class MainController {
  #purchaseInputView;
  #lottosOutputView;
  #winningInputView;
  #resultOutputView;

  #lottoTickets;
  #lottoTicketCount;

  constructor() {
    this.#purchaseInputView = new PurchaseInputView((purchaseMoneyInput) => this.#handlePurchaseButton(purchaseMoneyInput));
    this.#lottosOutputView = new LottosOutputView();
    this.#winningInputView = new WinningInputView((winningLottoInput, bonusNumberInput) => this.#handleResultButton(winningLottoInput, bonusNumberInput));
    this.#resultOutputView = new ResultOutputView(() => this.#handleRestartButton());
  }

  async run() {
    this.#purchaseInputView.render();
    this.#lottosOutputView.render();
    this.#winningInputView.render();
    this.#resultOutputView.render();
  }

  #handlePurchaseButton(purchaseMoneyInput) {
    try {
      const purchase = new Purchase(purchaseMoneyInput);
      this.#lottoTicketCount = purchase.getLottoTicketCount();

      const lottoMachine = new LottoMachine(this.#lottoTicketCount);
      this.#lottoTickets = lottoMachine.getLottoTickets();

      this.#lottosOutputView.renderLottos(this.#formatLottoTickets());
      this.#winningInputView.show();
    } catch (error) {
      alert(error.message);
    }
  }

  #handleResultButton(winningLottoInput, bonusNumberInput) {
    try {
      const winningNumbers = [...winningLottoInput].map((i) => Number(i.value)).join(",");
      const bonusNumber = Number(bonusNumberInput.value);

      const lottoManager = new WinningLottoManager(winningNumbers);
      lottoManager.setBonusNumber(bonusNumber);

      const lottoResult = new LottoResult(lottoManager, this.#lottoTickets);
      const { resultData, profitRate } = lottoResult.getResult(this.#lottoTicketCount);

      this.#resultOutputView.renderResult(resultData, profitRate);
    } catch (error) {
      alert(error.message);
    }
  }

  #handleRestartButton() {
    this.#lottoTickets = null;
    this.#lottoTicketCount = null;
    this.#winningInputView.hide();
    this.run();
  }

  #formatLottoTickets() {
    return this.#lottoTickets.map((lotto) => lotto.join(", "));
  }
}

export default MainController;
