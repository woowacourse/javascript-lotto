import LottoGame from "./domain/LottoGame.js";
import Validator from "./Validator.js";
import InputView from "./view/InputView.js";
import OutputView from "./view/OutputView.js";

class App {
  async run() {
    const lottoNum = await this.#getLottoNum();

    const lottoGame = new LottoGame(lottoNum);
    OutputView.printMessage(`${lottoNum}개를 구매했습니다.`);
    lottoGame.lottoes.forEach((lotto) => {
      OutputView.printMessage(lotto.numbers);
    });

    const targetNumber = await this.#getTargetNumber();
    const bonusNumber = await this.#getBonusNumber();

    lottoGame.calculate(targetNumber, bonusNumber);

    OutputView.printBlank();
    OutputView.printMessage("당첨 통계");
    OutputView.printMessage("--------------------");
    OutputView.printWinning(
      lottoGame.result,
      lottoGame.getEarningRate(lottoNum),
    );
    OutputView.printBlank();

    const retryAnswer = await this.#getRestartString();
    return retryAnswer;
  }

  async #getLottoNum() {
    let rawPriceString;
    while (true) {
      try {
        rawPriceString =
          await InputView.getInput("> 구입금액을 입력해 주세요.");
        Validator.isPrice(rawPriceString);
        break;
      } catch (error) {
        OutputView.printMessage(error.message);
      }
    }

    const lottoNum = Number(rawPriceString) / 1000;
    return lottoNum;
  }

  async #getTargetNumber() {
    let targetNumber;
    while (true) {
      try {
        targetNumber = await InputView.getInput("> 당첨 번호를 입력해 주세요.");
        Validator.isTargetNumber(targetNumber);
        targetNumber = targetNumber.split(",").map((a) => Number(a.trim()));
        break;
      } catch (error) {
        OutputView.printMessage(error.message);
      }
    }
    return targetNumber;
  }

  async #getBonusNumber() {
    let bonusNumber;
    while (true) {
      try {
        bonusNumber =
          await InputView.getInput("> 보너스 번호를 입력해 주세요.");
        Validator.isBonusNumber(bonusNumber);
        break;
      } catch (error) {
        OutputView.printMessage(error.message);
      }
    }
    return bonusNumber;
  }

  async #getRestartString() {
    let retryAnswer;
    while (true) {
      try {
        retryAnswer = await InputView.getInput(
          "> 다시 시작하시겠습니까? (y/n) ",
        );
        Validator.isRestartString(retryAnswer);
        break;
      } catch (error) {
        OutputView.printMessage(error.message);
      }
    }
    return retryAnswer;
  }
}

export default App;
