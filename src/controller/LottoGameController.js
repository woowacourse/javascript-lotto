import InputView from '../view/InputView';
import OutputView from '../view/OutputView';
import LottoGame from '../domain/LottoGame';
import Console from '../util/Console';
import InputValidator from '../validators/InputValidator';
import { GAME_COMMAND } from '../constants';
import LottoValidator from '../validators/LottoValidator';

class LottoGameController {
  async play() {
    const userBudget = await this.#getUserBudget();

    this.#issueLottoTickets(userBudget);
    this.#printLottoTickets();

    const winningNumbers = await this.#getLottoWinningNumbers();
    const bonusNumber = await this.#getLottoBonusNumber(winningNumbers);

    this.#printLottoGameResult(winningNumbers, bonusNumber);

    const restartCommand = await this.#getRestartCommand();

    this.#handleRestartProcess(restartCommand);
  }

  async #getUserBudget() {
    const userBudget = await InputView.readUserBudget();

    try {
      InputValidator.checkUserBudget(userBudget);
      return Number(userBudget);
    } catch (error) {
      Console.print(error.message);
      return this.#getUserBudget();
    }
  }

  #issueLottoTickets(userBudget) {
    this.lottoGame = new LottoGame(userBudget);
  }

  #printLottoTickets() {
    const lottoTickets = this.lottoGame.getLottoTickets();

    OutputView.printLottoTicketCount(lottoTickets.length);
    OutputView.printLottoTickets(lottoTickets);
  }

  async #getLottoWinningNumbers() {
    const winningNumbers = await InputView.readLottoWinningNumbers();

    try {
      InputValidator.checkWinningNumbers(winningNumbers);
      return winningNumbers.split(',').map((winningNumber) => Number(winningNumber.trim()));
    } catch (error) {
      Console.print(error.message);
      return this.#getLottoWinningNumbers();
    }
  }

  async #getLottoBonusNumber(winningNumbers) {
    const bonusNumber = await InputView.readLottoBonusNumber();

    try {
      LottoValidator.checkBonusNumber(winningNumbers, bonusNumber);
      return Number(bonusNumber);
    } catch (error) {
      Console.print(error.message);
      return this.#getLottoBonusNumber();
    }
  }

  #printLottoGameResult(winningNumbers, bonusNumber) {
    const lottoRanksResult = this.lottoGame.getLottoRankResult(winningNumbers, bonusNumber);

    OutputView.printResultTitle();
    OutputView.printLottoRanksResult(lottoRanksResult);
    OutputView.printProfitRate(this.lottoGame.calculateProfitRate());
  }

  async #getRestartCommand() {
    const restartCommand = await InputView.readRestartCommand();

    try {
      InputValidator.checkGameCommand(restartCommand.toLowerCase());
      return restartCommand.toLowerCase();
    } catch (error) {
      Console.print(error.message);
      return this.#getRestartCommand();
    }
  }

  #handleRestartProcess(restartCommand) {
    if (restartCommand === GAME_COMMAND.NO) return Console.close();
    this.play();
  }
}

export default LottoGameController;
