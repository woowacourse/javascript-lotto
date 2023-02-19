const InputView = require('../view/InputView');
const OutputView = require('../view/OutputView');
const LottoGame = require('../domain/LottoGame');
const Console = require('../util/Console');
const InputValidator = require('../validators/InputValidator');
const LottoTicket = require('../domain/LottoTicket');

class LottoGameController {
  play() {
    InputView.readUserBudget(this.#onSubmitUserBudget.bind(this));
  }

  #onSubmitUserBudget(userBudget) {
    try {
      InputValidator.checkUserBudget(userBudget);
      this.lottoGame = new LottoGame(Number(userBudget));
      const lottoTickets = this.lottoGame.getLottoTickets();
      OutputView.printLottoTicketCount(lottoTickets.length);
      OutputView.printLottoTickets(lottoTickets);
      InputView.readLottoWinningNumbers(this.#onSubmitLottoWinningNumber.bind(this));
    } catch (error) {
      Console.print(error.message);
      this.play();
    }
  }

  #onSubmitLottoWinningNumber(winningNumber) {
    try {
      InputValidator.checkWinningNumber(winningNumber);
      this.winningNumber = new LottoTicket(winningNumber.split(',').map(Number));
      InputView.readLottoBonusNumber(this.#onSubmitLottoBonusNumber.bind(this));
    } catch (error) {
      Console.print(error.message);
      InputView.readLottoWinningNumbers(this.#onSubmitLottoWinningNumber.bind(this));
    }
  }

  #onSubmitLottoBonusNumber(bonusNumber) {
    try {
      InputValidator.checkBonusNumber(this.winningNumber.getNumbers(), bonusNumber);
      const lottoRanksCount = this.lottoGame.countLottoRanks(
        this.winningNumber.getNumbers(),
        bonusNumber
      );
      OutputView.printResultTitle();
      OutputView.printLottoRanksResult(lottoRanksCount);
      OutputView.printProfitRate(
        this.lottoGame.calculateProfitRate(this.lottoGame.calculateTotalPrize(lottoRanksCount))
      );
      InputView.readRestartCommand(this.#onSubimtRestartCommand.bind(this));
    } catch (error) {
      Console.print(error.message);
      InputView.readLottoBonusNumber(this.#onSubmitLottoBonusNumber.bind(this));
    }
  }

  #onSubimtRestartCommand(command) {
    if (command === 'y') {
      this.play();
      return;
    }
    Console.close();
  }
}

module.exports = LottoGameController;
