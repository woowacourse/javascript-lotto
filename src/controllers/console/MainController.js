import { INPUT_MESSAGE } from "../../constants/message.js";

import Purchase from "../../models/Purchase.js";
import WinningLottoManager from "../../models/winningLottoManager.js";

import LottoMachine from "../../services/LottoMachine.js";
import LottoResult from "../../services/LottoResult.js";
import InputView from "../../views/console/InputView.js";
import OutputView from "../../views/console/OutputView.js";

class MainController {
  async run() {
    //1. 구입 금액 입력 받기 ==============================
    const purchase = await this.#readPurchaseMoney();
    //1-1. 로또 티켓 갯수 가져오기
    const lottoTicketCount = purchase.getLottoTicketCount();
    //1-2. 로또 머신 인스턴스 생성 및 로또 티켓 가져오기
    const lottoMachine = new LottoMachine(lottoTicketCount);
    const lottoTickets = lottoMachine.getLottoTickets();

    //2. 로또 티켓 구입 갯수와 구입한 로또 티켓 출력 ==============================
    OutputView.printPurchasedLottoTickets(lottoTicketCount, lottoTickets);

    //3. 당첨 번호 입력 받기 ==============================
    const winningLottoManager = await this.#readWinningLotto();

    //4. 보너스 번호 입력 받기 ==============================
    await this.#readAndSetBonusNumber(winningLottoManager);

    // 5. 로또 결과 인스턴스 생성 ==============================
    const lottoResult = new LottoResult(winningLottoManager, lottoTickets);
    // 5-1. 가공된 로또 결과를 가져오기
    const { resultData, profitRate } = lottoResult.getResult(lottoTicketCount);

    //6. 당첨 통계 및 수익률 출력 ==============================
    OutputView.printResult(resultData, profitRate);
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
      return new WinningLottoManager(winningLottoInput);
    } catch (error) {
      OutputView.printMessage(error.message);
      return await this.#readWinningLotto();
    }
  }

  async #readAndSetBonusNumber(WinningLottoManager) {
    try {
      const bonusNumberInput = await InputView.readStringWithMsg(INPUT_MESSAGE.BONUS_NUMBER);

      WinningLottoManager.setBonusNumber(bonusNumberInput);
    } catch (error) {
      OutputView.printMessage(error.message);
      return await this.#readAndSetBonusNumber(WinningLottoManager);
    }
  }
}

export default MainController;
