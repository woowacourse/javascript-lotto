import InputConsole from "./Console/InputConsole.js";
import OutputConsole from "./Console/OutputConsole.js";
import LottoMachine from "./Domain/LottoMachine.js";
import LuckyNumbers from "./Domain/LuckyNumbers.js";
import LottoResult from "./Domain/LottoResult.js";
import LuckyNumbers from "./Domain/LuckyNumbers.js";

class App {
  async run() {
    while(true){
    // 구입할 로또 금액 입력받기
    const purchasePrice = await InputConsole.readPurchasePrice();

    // 발행된 로또 목록 출력하기
    const lottos = new LottoMachine.issueLottos(purchasePrice);
    OutputConsole.printLottoList(lottos);

    // 당첨 번호 입력받기
    const winningNumbers = await InputConsole.readWinningNumbers();

    // 보너스 번호 입력받기
    const bonusNumber = await InputConsole.readBonusNumber(winningNumbers);

    // 당첨 통계 출력하기
    const luckyNumbers = new LuckyNumbers(winningNumbers, bonusNumber);
    const lottoResult = new LottoResult();
    const winningResult = lottoResult.calculateWinningResult(lottos, luckyNumbers);
    OutputConsole.printMatchResult(winningResult);

    // 총 수익률 출력하기
    const profitRate = lottoResult.calculateProfitRate(winningResult,purchasePrice);
    OutputConsole.printProfitRate(profitRate);

    // 재시작 로직 출력
    const restartCommand = await InputConsole.readRestart();
    if(restartCommand==="n") break;
    }
  }
}

export default App;
