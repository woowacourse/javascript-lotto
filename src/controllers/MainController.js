import { INPUT_MESSAGE } from "../constants/message.js";

import InputView from "../views/InputView.js";
import OutputView from "../views/OutputView.js";

import Purchase from "../models/Purchase.js";
import WinningLottoManager from "../models/winningLottoManager.js";

import LottoMachine from "../services/LottoMachine.js";
import LottoResult from "../services/LottoResult.js";

class MainController {
  // 애플리케이션의 진입점. 실행 흐름을 순서대로 제어합니다.
  async run() {
    // 1) 구매 입력 받고 로또 티켓 생성
    const { lottoTicketCount, lottoTickets } = await this.#purchaseAndGenerateTickets();

    // 2) 당첨 번호(및 보너스) 입력 및 매니저 생성
    const winningLottoManager = await this.#getWinningLottoManager();

    // 3) 결과 준비 및 출력
    const lottoResult = this.#prepareLottoResult(winningLottoManager, lottoTickets);
    const { resultData, profitRate } = lottoResult.getResult(lottoTicketCount);
    this.#printResults(resultData, profitRate);
  }

  async #readPurchaseMoney() {
    // 사용자가 입력한 구입 금액을 읽고 Purchase 인스턴스를 반환합니다.
    try {
      const purchaseMoneyInput = await InputView.readStringWithMsg(INPUT_MESSAGE.PURCHASE_MONEY);
      return new Purchase(purchaseMoneyInput);
    } catch (error) {
      OutputView.printMessage(error.message);
      return await this.#readPurchaseMoney();
    }
  }

  async #readWinningLotto() {
    // 사용자가 입력한 당첨 번호 문자열을 읽어 원시 문자열을 반환합니다.
    try {
      const winningLottoInput = await InputView.readStringWithMsg(INPUT_MESSAGE.WINNING_LOTTO);
      return winningLottoInput;
    } catch (error) {
      OutputView.printMessage(error.message);
      return await this.#readWinningLotto();
    }
  }

  async #purchaseAndGenerateTickets() {
    // 구매 프로세스: 금액 입력 -> 티켓 수 계산 -> 로또 생성 -> 출력
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
    // 당첨 번호(문자열)를 읽어 파싱한 뒤 WinningLottoManager를 생성하고
    // 보너스 번호를 설정합니다.
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
    // LottoResult 인스턴스를 생성하여 결과 계산을 준비합니다.
    return new LottoResult(winningLottoManager, lottoTickets);
  }

  #printResults(resultData, profitRate) {
    // 결과와 수익률을 출력합니다.
    OutputView.printResult(resultData, profitRate);
  }

  async #readAndSetBonusNumber(winningLottoManager) {
    // 사용자가 입력한 보너스 번호를 읽어 WinningLottoManager에 설정합니다.
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
