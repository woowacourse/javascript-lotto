const InputView = require('../view/InputView');
const OutputView = require('../view/OutputView');
const LottoGame = require('../domain/LottoGame');
const Console = require('../util/Console');
const InputValidator = require('../validators/InputValidator');
const LottoTicket = require('../domain/LottoTicket');
const { GAME_COMMAND } = require('../constants');

class LottoGameController {
  async play() {
    const userBudget = await this.#getUserBudget();

    this.#issueLottoTickets(userBudget);
    this.#printLottoTickets();

    const winningNumbers = await this.#getLottoWinningNumbers();
    const bonusNumber = await this.#getLottoBonusNumber();

    this.#printLottoGameResult();

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

  #printLottoGameResult() {
    const lottoRanksCount = this.lottoGame.countLottoRanks(this.winningNumber, bonusNumber);

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
    if (command === GAME_COMMAND.NO) return Console.close();
    this.play();
  }
}

module.exports = LottoGameController;
