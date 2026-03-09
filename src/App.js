import { Console } from "@woowacourse/mission-utils";
import InputConsole from "./Console/InputConsole.js";
import OutputConsole from "./Console/OutputConsole.js";
import LottoMachine from "./Domain/LottoMachine.js";
import LottoResult from "./Domain/LottoResult.js";
import Validator from "./Utils/Validator.js";
class App {
  async run() {
    while (true) {
      // 구입할 로또 금액 입력받기
      const purchasePrice = await this.#readPurchasePrice();

      // 발행된 로또 목록 출력하기
      const lottoMachine = new LottoMachine();
      const lottos = lottoMachine.issueLottos(purchasePrice);
      OutputConsole.printLottoList(lottos);

      // 당첨 번호 입력받기
      const winningNumbers = await this.#readWinningNumbers();

      // 보너스 번호 입력받기
      const bonusNumber = await this.#readBonusNumber();

      // 당첨 통계 출력하기
      const luckyNumbers = {
        winningNumbers,
        bonusNumber,
      };
      const lottoResult = new LottoResult();
      const winningResult = lottoResult.calculateWinningResult(
        lottos,
        luckyNumbers,
      );
      OutputConsole.printMatchResult(winningResult);

      // 총 수익률 출력하기
      const profitRate = lottoResult.calculateProfitRate(
        winningResult,
        purchasePrice,
      );
      OutputConsole.printProfitRate(profitRate);

      // 재시작 로직 출력하기
      const restartCommand = await InputConsole.readRestart();
      if (restartCommand === "n") break;
    }
  }

  async #readPurchasePrice() {
    while (true) {
      try {
        const input = await InputConsole.readPurchasePrice();
        return Validator.validatePurchasePrice(input);
      } catch (e) {
        Console.print(e.message);
      }
    }
  }

  async #readWinningNumbers() {
    while (true) {
      try {
        const inputs = await InputConsole.readWinningNumbers();
        return Validator.validateWinningNumbers(inputs);
      } catch (e) {
        Console.print(e.message);
      }
    }
  }

  async #readBonusNumber() {
    while (true) {
      try {
        const inputs = await InputConsole.readBonusNumber();
        return Validator.validateBonusNumber(inputs);
      } catch (e) {
        Console.print(e.message);
      }
    }
  }
}

export default App;
