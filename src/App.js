import LOTTO_GAME from "./constants/LottoGame";
import VIEW from "./constants/View";
import Console from "./util/Console";
import InputView from "./view/InputView";
import Lotto from "./domain/Lotto";
import Lottos from "./domain/Lottos";
import Random from "./util/Random";
import OutputView from "./view/OutputView";
import LottoScore from "./domain/LottoScore";
import InputCheck from "./InputCheck";
import Utils from "./util/Utils";

class App {
  async play() {
    const buyMoney = await this.getBuyMoney();
    const lottos = await this.createLotto(parseInt(buyMoney / LOTTO_GAME.LOTTO_PRICE));
    const lottoScore = new LottoScore(lottos.lottos)
    const winningLotto = await this.getWinningLotto();
    const bonusNumber = await this.getBonusNumber(winningLotto);
    this.compareLottos(lottos, winningLotto, bonusNumber,lottoScore);
    const retryInput = await this.getRetryInput();
    this.retryLottoGame(retryInput, lottos, lottoScore);
  }

  async getBuyMoney() {
    const buyMoney = await InputView.inputMoney(VIEW.INPUT_MONEY);
    try {
      InputCheck.validateBuyMoney(buyMoney);
    } catch (e) {
      Console.print(e);
      return await this.getBuyMoney();
    }
    return Number(buyMoney);
  }

  async createLotto(lottoAmount) {
    const createdLotto = Array.from(
      { length: lottoAmount },
      () => new Lotto(Random.generateRandomNumbers())
    );
    const lottos = new Lottos(createdLotto)
    OutputView.printBuyLottos(lottos);
    return lottos;
  }

  async getWinningLotto() {
    const winningNumbers = await InputView.inputWinningNumbers(
      VIEW.INPUT_WINNING_LOTTO
    );
    const winningLotto = Utils.convertStringToNumber(winningNumbers.split(","));
    try {
      InputCheck.validateWinningNumbers(winningLotto);
    } catch (e) {
      Console.print(e);
      return await this.getWinningLotto();
    }
    return winningLotto;
  }

  async getBonusNumber(winningLotto) {
    const bonusInput = await InputView.inputBonusNumber(
      VIEW.INPUT_BONUS_NUMBER
    );
    const bonusNumber = Number(bonusInput);
    try {
      InputCheck.validateBonusNumber(bonusNumber, winningLotto);
      InputCheck.checkNumber(bonusNumber);
    } catch (e) {
      Console.print(e);
      return await this.getBonusNumber(winningLotto);
    }
    return bonusNumber;
  }

  compareLottos(lottos, winningLotto, bonusNumber,lottoScore) {
    lottos.compareLottosWithWinningLotto(winningLotto, bonusNumber);
    lottoScore.compareLottosScore();
    OutputView.printResult(lottos.lottos.length, lottoScore);
  }

  async getRetryInput() {
    const retryInput = await InputView.inputRetry(VIEW.INPUT_RETYR);
    try {
      InputCheck.validateRetryInput(retryInput);
    } catch (e) {
      Console.print(e);
      return await this.getRetryInput();
    }
    return retryInput;
  }

  async retryLottoGame(retryInput, lottos,lottoScore) {
    if (retryInput === LOTTO_GAME.RETRY_DOWNER) {
      lottos.resetLottos();
      lottoScore.resetLottoScore()
      await this.play();
    }
    if (retryInput === LOTTO_GAME.QUIT_DOWNER) {
      Console.close();
    }
  }
}

export default App;
