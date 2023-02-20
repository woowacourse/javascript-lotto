import InputView from '../view/InputView';
import OutputView from '../view/OutputView';
import LottoGame from '../domain/LottoGame';
import Console from '../util/Console';
import InputValidator from '../validators/InputValidator';
import LottoTicket from '../domain/LottoTicket';
import { GAME_COMMAND } from '../constants/constants';
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
      InputView.readLottoWinningNumber(this.#onSubmitLottoWinningNumber.bind(this));
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
      InputView.readLottoWinningNumber(this.#onSubmitLottoWinningNumber.bind(this));
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
      InputView.readRestartCommand(this.#onSubmitRestartCommand.bind(this));
    } catch (error) {
      Console.print(error.message);
      InputView.readLottoBonusNumber(this.#onSubmitLottoBonusNumber.bind(this));
    }
  }

  #onSubmitRestartCommand(command) {
    if (command === GAME_COMMAND.YES) {
      this.play();
      return;
    }
    Console.close();
  }
}

export default LottoGameController;
