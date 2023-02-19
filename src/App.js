import Console from "./util/Console.js";
import Validations from "./Validations.js";
import InputView from "./view/InputView.js";
import Lotto from "./domain/Lotto.js";
import Lottos from "./domain/Lottos.js";
import Random from "./util/Random.js";
import OutputView from "./view/OutputView.js";
import View from "./constants/View.js";
import LottoScore from "./domain/LottoScore.js";
import InputCheck from "./InputCheck.js";

class App {
  async play() {
    const buyMoney = await this.getBuyMoney();
    const lottos = await this.createLotto(parseInt(buyMoney / 1000));
    this.printLottos(lottos.getLottos());
    const winningLotto = await this.getWinningLotto();
    const bonusNumber = await this.getBonusNumber(winningLotto);
    this.compareLottos(lottos, winningLotto, bonusNumber);
    const retryInput = await this.getRetryInput(lottos);
    this.retryLottoGame(retryInput, lottos);
  }

  async getBuyMoney() {
    const buyMoney = await InputView.inputMoney(View.INPUT_MONEY);
    try {
      InputCheck.validateBuyMoney(buyMoney);
    } catch (e) {
      Console.print(e);
      return await this.getBuyMoney();
    }
    return buyMoney;
  }

  async createLotto(lottoAmount) {
    const lottos = Array.from(
      { length: lottoAmount },
      () => new Lotto(Random.getCorrectRandomNumbers())
    );
    return new Lottos(lottos);
  }

  printLottos(lottos) {
    OutputView.printLottoAmount(lottos.length);
    OutputView.printLottos(lottos);
  }

  async getWinningLotto() {
    const winningNumbers = await InputView.inputWinningNumbers(
      View.INPUT_WINNING_LOTTO
    );
    const winningLotto = this.convertStringToNumber(winningNumbers.split(","));
    try {
      InputCheck.validateWinningNumbers(winningLotto);
    } catch (e) {
      Console.print(e);
      return await this.getWinningLotto();
    }
    return winningLotto;
  }

  convertStringToNumber(strings) {
    const numbers = strings.map((string) => {
      return Number(string);
    });
    return numbers;
  }

  async getBonusNumber(winningLotto) {
    const bonusInput = await InputView.inputBonusNumber(
      View.INPUT_BONUS_NUMBER
    );
    const bonusNumber = Number(bonusInput);
    try {
      InputCheck.validateBonusNumber(bonusNumber, winningLotto);
      InputCheck.checkEachNumber(bonusNumber);
    } catch (e) {
      Console.print(e);
      return await this.getBonusNumber();
    }
    return bonusNumber;
  }

  compareLottos(lottos, winningLotto, bonusNumber) {
    lottos.compareLottosWithWinningLotto(winningLotto, bonusNumber);
    const lottoScore = new LottoScore();
    lottoScore.compareLottosScore(lottos.getLottos());
    this.printResult(lottos, lottoScore);
  }

  printResult(lottos, lottoScore) {
    OutputView.printResultMessage();
    OutputView.printLottoResults(lottoScore);
    OutputView.printTotalBenefit(
      lottoScore.getBenefitRate(lottos.getLottos().length)
    );
  }

  async getRetryInput() {
    const retryInput = await InputView.inputRetry(View.INPUT_RETYR);
    try {
      this.validateRetryInput(retryInput);
    } catch (e) {
      Console.print(e);
      return await this.getRetryInput();
    }
  }

  async retryLottoGame(retryInput, lottos) {
    // if (
    //   retryInput === Constant.RETRY_DOWNER ||
    //   retryInput === Constant.RETRY_UPPER
    // ) {
    // this.resetGame(lottos);
    lottos.resetLottos();
    this.play();
    // }
    // if (
    //   retryInput === Constant.QUIT_DOWNER ||
    //   retryInput === Constant.QUIT_UPPER
    // ) {
    //   Console.close();
    // }
  }

  // validateRetryInput(retryInput) {
  //   if (!Validations.isCorrectRetryInput(retryInput)) {
  //     throw new Error(Error.INPUT_CORRECT_RETRY);
  //   }
  // }
}

export default App;
