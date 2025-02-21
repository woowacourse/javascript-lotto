import LottoGame from "./domain/LottoGame.js";
import Validator from "./domain/Validator.js";
import InputView from "./view/InputView.js";
import OutputView from "./view/OutputView.js";
import loopWhileValid from "./utils/loopWhileValid.js";
import Constants from "./constant/Constants.js";

class App {
  async run() {
    const lottoNum = await loopWhileValid(this.#getLottoNum);
    const lottoGame = new LottoGame(lottoNum);
    OutputView.printMessage(`${lottoNum}개를 구매했습니다.`);
    lottoGame.lottos.forEach((lotto) => {
      OutputView.printMessage(lotto.getLottoNumber());
    });

    OutputView.printBlank();
    const targetNumber = await loopWhileValid(this.#getTargetNumber);

    OutputView.printBlank();
    const bonusNumber = await loopWhileValid(
      this.#getBonusNumber,
      targetNumber,
    );

    lottoGame.calculate(targetNumber, bonusNumber);

    OutputView.printWinning(
      lottoGame.getGameResult(),
      lottoGame.getEarningRate(lottoNum),
    );

    OutputView.printBlank();
    const retryAnswer = await loopWhileValid(this.#getRestartString);
    return retryAnswer;
  }

  async #getLottoNum() {
    const rawPriceString = await InputView.getInput(Constants.MESSAGE.PRICE);
    Validator.isPrice(rawPriceString);
    const lottoNum = Number(rawPriceString) / Constants.LOTTO.UNIT;
    return lottoNum;
  }

  async #getTargetNumber() {
    const targetNumber = await InputView.getInput(
      Constants.MESSAGE.TARGET_NUMBER,
    );
    Validator.isTargetNumber(targetNumber);
    const targetNumberList = targetNumber
      .split(Constants.OPERATOR.SEPARATOR)
      .map((a) => Number(a.trim()));
    return targetNumberList;
  }

  async #getBonusNumber(targetNumber) {
    const bonusNumber = await InputView.getInput(
      Constants.MESSAGE.BONUS_NUMBER,
    );
    Validator.isBonusNumber(bonusNumber, targetNumber);
    return Number(bonusNumber);
  }

  async #getRestartString() {
    const retryAnswer = await InputView.getInput(
      Constants.MESSAGE.RESTART_STRING,
    );
    Validator.isRestartString(retryAnswer);
    return retryAnswer;
  }
}

export default App;
