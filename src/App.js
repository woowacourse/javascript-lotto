import LottoGame from "./domain/LottoGame.js";
import Validator from "./domain/Validator.js";
import InputView from "./view/InputView.js";
import OutputView from "./view/OutputView.js";
import loopWhileValid from "./utils/loopWhileValid.js";

class App {
  async run() {
    const lottoNum = await loopWhileValid(this.#getLottoNum);
    const lottoGame = new LottoGame(lottoNum);
    OutputView.printMessage(`${lottoNum}개를 구매했습니다.`);
    lottoGame.lottoes.forEach((lotto) => {
      OutputView.printMessage(lotto.getLottoNumbers());
    });

    const targetNumber = await loopWhileValid(this.#getTargetNumber);
    const bonusNumber = await loopWhileValid(
      this.#getBonusNumber,
      targetNumber,
    );

    lottoGame.calculate(targetNumber, bonusNumber);

    OutputView.printBlank();
    OutputView.printMessage("당첨 통계");
    OutputView.printMessage("--------------------");
    OutputView.printWinning(
      lottoGame.getGameResult(),
      lottoGame.getEarningRate(lottoNum),
    );
    OutputView.printBlank();

    const retryAnswer = await loopWhileValid(this.#getRestartString);
    return retryAnswer;
  }

  async #getLottoNum() {
    const rawPriceString =
      await InputView.getInput("> 구입금액을 입력해 주세요.");
    Validator.isPrice(rawPriceString);
    const lottoNum = Number(rawPriceString) / 1000;
    return lottoNum;
  }

  async #getTargetNumber() {
    const targetNumber =
      await InputView.getInput("> 당첨 번호를 입력해 주세요.");
    Validator.isTargetNumber(targetNumber);
    const targetNumberList = targetNumber
      .split(",")
      .map((a) => Number(a.trim()));
    return targetNumberList;
  }

  async #getBonusNumber(targetNumber) {
    const bonusNumber =
      await InputView.getInput("> 보너스 번호를 입력해 주세요.");
    Validator.isBonusNumber(bonusNumber, targetNumber);
    return Number(bonusNumber);
  }

  async #getRestartString() {
    const retryAnswer = await InputView.getInput(
      "> 다시 시작하시겠습니까? (y/n) ",
    );
    Validator.isRestartString(retryAnswer);
    return retryAnswer;
  }
}

export default App;
