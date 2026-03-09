import InputConsole from "./Console/InputConsole.js";
import OutputConsole from "./Console/OutputConsole.js";
import LottoMachine from "./Domain/LottoMachine.js";
import LottoResultCalculator from "./Domain/LottoResultCalculator.js";
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
      const bonusNumber = await this.#readBonusNumber(winningNumbers);

      // 당첨 통계 출력하기
      const luckyNumbers = {
        winningNumbers,
        bonusNumber,
      };
      const resultCalculator = new LottoResultCalculator();
      const winningResult = resultCalculator.calculateWinningRank(
        lottos,
        luckyNumbers,
      );
      OutputConsole.printMatchResult(winningResult);

      // 총 수익률 출력하기
      const profitRate = resultCalculator.calculateProfitRate(
        winningResult,
        purchasePrice,
      );
      OutputConsole.printProfitRate(profitRate);

      // 재시작 로직 출력하기
      const restartCommand = await this.#readRestart();
      if (restartCommand === "n") break;
    }
  }

  async #readPurchasePrice() {
    while (true) {
      try {
        const input = await InputConsole.readPurchasePrice();
        return Validator.validatePurchasePrice(input);
      } catch (e) {
        OutputConsole.printErrorMessage(e.message);
      }
    }
  }

  async #readWinningNumbers() {
    while (true) {
      try {
        const inputs = await InputConsole.readWinningNumbers();
        return Validator.validateWinningNumbers(inputs);
      } catch (e) {
        OutputConsole.printErrorMessage(e.message);
      }
    }
  }

  async #readBonusNumber(winningNumbers) {
    while (true) {
      try {
        const input = await InputConsole.readBonusNumber();
        return Validator.validateBonusNumber(input, winningNumbers);
      } catch (e) {
        OutputConsole.printErrorMessage(e.message);
      }
    }
  }

  async #readRestart() {
    while (true) {
      try {
        const input = await InputConsole.readRestart();
        return Validator.validateRestart(input);
      } catch (e) {
        OutputConsole.printErrorMessage(e.message);
      }
    }
  }
}

export default App;
