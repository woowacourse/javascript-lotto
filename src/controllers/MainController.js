import { INPUT_MESSAGE } from "../constants/message.js";

import InputView from "../views/InputView.js";
import OutputView from "../views/OutputView.js";

import Purchase from "../models/Purchase.js";
import WinningLottoManager from "../models/WinningLottoManager.js";

import LottoMachine from "../services/LottoMachine.js";
import LottoResult from "../services/LottoResult.js";

class MainController {
  async run() {
    const { lottoTicketCount, lottoTickets } = await this.#purchaseAndGenerateTickets();

    const winningLottoManager = await this.#getWinningLottoManager();

    const lottoResult = this.#prepareLottoResult(winningLottoManager, lottoTickets);
    const { resultData, profitRate } = lottoResult.getResult(lottoTicketCount);
    this.#printResults(resultData, profitRate);
  }

  async #readPurchaseMoney() {
    try {
      const purchaseMoneyInput = await InputView.readStringWithMsg(INPUT_MESSAGE.PURCHASE_MONEY);
      return new Purchase(purchaseMoneyInput);
    } catch (error) {
      OutputView.printMessage(error.message);
      return await this.#readPurchaseMoney();
    }
  }

  async #readWinningLotto() {
    try {
      const winningLottoInput = await InputView.readStringWithMsg(INPUT_MESSAGE.WINNING_LOTTO);
      return winningLottoInput;
    } catch (error) {
      OutputView.printMessage(error.message);
      return await this.#readWinningLotto();
    }
  }

  async #purchaseAndGenerateTickets() {
    try {
      const purchase = await this.#readPurchaseMoney();
      const lottoTicketCount = purchase.getLottoTicketCount();
      const lottoMachine = new LottoMachine(lottoTicketCount);
      const lottoTickets = lottoMachine.getLottoTickets();

      OutputView.printPurchasedLottoTickets(lottoTicketCount, lottoTickets);

      return { lottoTicketCount, lottoTickets, purchase };
    } catch (error) {
      OutputView.printMessage(error.message);
      return await this.#purchaseAndGenerateTickets();
    }
  }

  async #getWinningLottoManager() {
    try {
      const winningLottoInput = await this.#readWinningLotto();
      const parsedWinningLottos = winningLottoInput.split(",").map(Number);
      const winningLottoManager = new WinningLottoManager(parsedWinningLottos);

      await this.#readAndSetBonusNumber(winningLottoManager);
      return winningLottoManager;
    } catch (error) {
      OutputView.printMessage(error.message);
      return await this.#getWinningLottoManager();
    }
  }

  #prepareLottoResult(winningLottoManager, lottoTickets) {
    return new LottoResult(winningLottoManager, lottoTickets);
  }

  #printResults(resultData, profitRate) {
    OutputView.printResult(resultData, profitRate);
  }

  async #readAndSetBonusNumber(winningLottoManager) {
    try {
      const bonusNumberInput = await InputView.readStringWithMsg(INPUT_MESSAGE.BONUS_NUMBER);

      winningLottoManager.setBonusNumber(bonusNumberInput);
    } catch (error) {
      OutputView.printMessage(error.message);
      return await this.#readAndSetBonusNumber(winningLottoManager);
    }
  }
}

export default MainController;
