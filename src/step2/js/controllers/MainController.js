import Purchase from "../../../models/Purchase.js";
import WinningLottoManager from "../../../models/WinningLottoManager.js";

import LottoMachine from "../../../services/LottoMachine.js";
import LottoResult from "../../../services/LottoResult.js";

import LottoView from "../views/LottoView.js";

class MainController {
  #view;

  #ticketCount = 0;
  #lottoMachine = null;

  constructor() {
    this.#view = new LottoView();
    this.#bindEvents();
  }

  #bindEvents() {
    this.#view.bindPurchase(this.#handlePurchase.bind(this));
    this.#view.bindResult(this.#handleResult.bind(this));
    this.#view.bindRestart(this.#handleRestart.bind(this));
  }

  /* handle 메소드 */
  #handlePurchase(moneyInput) {
    try {
      const { lottoMachine, ticketCount, tickets } = this.#purchaseLottos(moneyInput);
      this.#ticketCount = ticketCount;
      this.#lottoMachine = lottoMachine;
      this.#view.renderLottoTickets(tickets, ticketCount);
    } catch (error) {
      alert(error.message);
      this.#view.focusPurchaseInput();
    }
  }

  #handleResult(winningNumbersInput, bonusNumberInput) {
    try {
      const { resultData, profitRate } = this.#calculateResult(winningNumbersInput, bonusNumberInput);
      this.#view.renderResultModal(resultData, profitRate);
    } catch (error) {
      alert(error.message);
      this.#view.focusWinningInput();
    }
  }

  #handleRestart() {
    this.#resetState();
    this.#view.resetUI();
  }

  /* handle에서 쓰이는 로직 메소드 */
  #purchaseLottos(moneyInput) {
    const purchase = new Purchase(moneyInput);
    const ticketCount = purchase.getLottoTicketCount();
    const lottoMachine = new LottoMachine(ticketCount);
    const tickets = lottoMachine.getLottoTickets();

    return { lottoMachine, ticketCount, tickets };
  }

  #calculateResult(winningNumbersInput, bonusNumberInput) {
    const winningLottoManager = this.#createWinningLottoManager(winningNumbersInput, bonusNumberInput);
    const lottoTickets = this.#lottoMachine.getLottoTickets();
    const lottoResult = new LottoResult(winningLottoManager, lottoTickets);

    return lottoResult.getResult(this.#ticketCount);
  }

  #createWinningLottoManager(winningNumbersInput, bonusNumberInput) {
    const parsedWinningNumbers = winningNumbersInput.map(Number);
    const winningLottoManager = new WinningLottoManager(parsedWinningNumbers);
    winningLottoManager.setBonusNumber(bonusNumberInput);

    return winningLottoManager;
  }

  #resetState() {
    this.#ticketCount = 0;
    this.#lottoMachine = null;
  }
}

export default MainController;
