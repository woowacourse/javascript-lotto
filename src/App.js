import InputConsole from "./Console/InputConsole.js";
import OutputConsole from "./Console/OutputConsole.js";
import LottoMachine from "./Domain/LottoMachine.js";
import LuckyNumbers from "./Domain/LuckyNumbers.js";
import LottoResult from "./Domain/LottoResult.js";
import Lotto from "./Domain/Lotto.js";
import { MissionUtils } from "@woowacourse/mission-utils";

class App {
  async run() {
    while(true){
    // 구입할 로또 금액 입력받기
    // 발행된 로또 목록 출력하기
    const lottos = await this.#issueLottosStep();
    OutputConsole.printLottoList(lottos);

    // 당첨 번호 입력받기
    const winningNumbers = await this.#readWinningNumbersStep();

    // 보너스 번호 입력받아서 LuckyNumbers 인스턴스 생성하기
    const luckyNumbers = await this.#getLuckyNumbersStep(winningNumbers);

    // 당첨 통계 출력하기
    const lottoResult = new LottoResult();
    const winningResult = lottoResult.calculateWinningResult(lottos, luckyNumbers);
    OutputConsole.printMatchResult(winningResult);

    // 총 수익률 출력하기
    const purchasePrice = lottos.length * 1000;
    const profitRate = lottoResult.calculateProfitRate(winningResult,purchasePrice);
    OutputConsole.printProfitRate(profitRate);

    // 재시작 로직 출력
    const restartCommand = await InputConsole.readRestart();
    if(restartCommand==="n") break;
    }
  }

  async #issueLottosStep() {
    try {
      const purchasePriceStr = await InputConsole.readPurchasePrice();

      const generateRandomNumber = () => MissionUtils.Random.pickUniqueNumbersInRange(1, 45, 6);

      return LottoMachine.issueLottos(purchasePriceStr, generateRandomNumber);
    } catch (e) {
      OutputConsole.printError(e.message);
      
      return await this.#issueLottosStep();
    }
  }

  async #readWinningNumbersStep() {
    try {
      const winningNumbersArr = await InputConsole.readWinningNumbers();
      new Lotto(winningNumbersArr);

      return winningNumbersArr;
    } catch (e) {
      OutputConsole.printError(e.message);

      return await this.#readWinningNumbersStep();
    }
  }

  async #getLuckyNumbersStep(winningNumbers) {
    try {
      const bonusNumberStr = await InputConsole.readBonusNumber();

      return new LuckyNumbers(winningNumbers, bonusNumberStr);
    } catch (e) {
      OutputConsole.printError(e.message);

      return await this.#getLuckyNumbersStep(winningNumbers);
    }
  }
}

export default App;
