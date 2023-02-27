import LOTTO_GAME from "./constants/LottoGame";
import VIEW from "./constants/View";
import Console from "./util/Console";
import InputView from "./view/InputView";
import Lotto from "./domain/Lotto";
import Random from "./util/Random";
import OutputView from "./view/OutputView";
import LottoScore from "./domain/LottoScore";
import InputCheck from "./InputCheck";
import Utils from "./util/Utils";
import LottoMachine from "./domain/LottoMachine";

class App {
  #lottos;

  constructor() {
    this.lottoMachine = new LottoMachine();
  }

  async play() {
    const buyMoney = await this.getBuyMoney();
    await this.createLotto(parseInt(buyMoney / LOTTO_GAME.LOTTO_PRICE));
    const lottoScore = new LottoScore(this.#lottos);
    const winningLotto = await this.getWinningLotto();
    const bonusNumber = await this.getBonusNumber(winningLotto);
    this.compareLottos(winningLotto, bonusNumber, lottoScore);
    const retryInput = await this.getRetryInput();
    this.retryLottoGame(retryInput, lottoScore);
  }

  async getBuyMoney() {
    const buyMoney = await InputView.inputMoney(VIEW.INPUT_MONEY);
    try {
      InputCheck.validateBuyMoney(buyMoney, false);
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
    this.#lottos = [...createdLotto];
    OutputView.printBuyLottos(this.#lottos);
  }

  async getWinningLotto() {
    const winningNumbers = await InputView.inputWinningNumbers(
      VIEW.INPUT_WINNING_LOTTO
    );
    const winningLotto = Utils.convertStringToNumber(winningNumbers.split(","));
    try {
      InputCheck.validateWinningNumbers(winningLotto, false);
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
      InputCheck.validateBonusNumber(bonusNumber, winningLotto, false);
      InputCheck.checkNumber(bonusNumber, false);
    } catch (e) {
      Console.print(e);
      return await this.getBonusNumber(winningLotto);
    }
    return bonusNumber;
  }

  compareLottos(winningLotto, bonusNumber, lottoScore) {
    this.lottoMachine.compareLottos(
      this.#lottos,
      winningLotto,
      bonusNumber,
      lottoScore
    );
    lottoScore.compareLottosScore();
    OutputView.printResult(this.#lottos.length, lottoScore);
  }

  async getRetryInput() {
    const retryInput = await InputView.inputRetry(VIEW.INPUT_RETYR);
    try {
      InputCheck.validateRetryInput(retryInput, false);
    } catch (e) {
      Console.print(e);
      return await this.getRetryInput();
    }
    return retryInput;
  }

  async retryLottoGame(retryInput, lottoScore) {
    if (retryInput === LOTTO_GAME.RETRY_DOWNER) {
      this.#lottos = [];
      lottoScore.resetLottoScore();
      await this.play();
    }
    if (retryInput === LOTTO_GAME.QUIT_DOWNER) {
      Console.close();
    }
  }
}

export default App;
