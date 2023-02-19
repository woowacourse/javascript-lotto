import InputView from '../view/InputView';
import OutputView from '../view/OutputView';
import LottoGame from '../domain/LottoGame';
import Console from '../util/Console';
import InputValidator from '../validators/InputValidator';
import { GAME_COMMAND } from '../constants';

class LottoGameController {
  async play() {
    const userBudget = await this.#getUserBudget();

    this.#issueLottoTickets(userBudget);
    this.#printLottoTickets();

    const winningNumbers = await this.#getLottoWinningNumbers();
    const bonusNumber = await this.#getLottoBonusNumber();

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
      this.#getUserBudget();
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
      return winningNumbers.split(',').map(Number);
    } catch (error) {
      Console.print(error.message);
      this.#getLottoWinningNumbers();
    }
  }

  async #getLottoBonusNumber() {
    const bonusNumber = await InputView.readLottoBonusNumber();

    try {
      InputValidator.checkBonusNumber(bonusNumber);
      return Number(bonusNumber);
    } catch (error) {
      Console.print(error.message);
      this.#getLottoBonusNumber();
    }
  }

  #printLottoGameResult(winningNumbers, bonusNumber) {
    const lottoRanksCount = this.lottoGame.countLottoRanks(winningNumbers, bonusNumber);

    OutputView.printResultTitle();
    OutputView.printLottoRanksResult(lottoRanksCount);
    OutputView.printProfitRate(
      this.lottoGame.calculateProfitRate(this.lottoGame.calculateTotalPrize(lottoRanksCount))
    );
  }

  async #getRestartCommand() {
    const restartCommand = await InputView.readRestartCommand();

    try {
      // TODO: restartCommand validation 추가
      return restartCommand;
    } catch (error) {
      Console.print(error.message);
      this.#getRestartCommand();
    }
  }

  #handleRestartProcess(restartCommand) {
    if (restartCommand === GAME_COMMAND.NO) return Console.close();
    this.play();
  }
}

export default LottoGameController;
