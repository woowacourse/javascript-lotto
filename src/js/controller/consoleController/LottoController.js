import { COMMAND } from '../../constant/setting';
import Comparer from '../../domain/Comparer';
import LottoMachine from '../../domain/LottoMachine';
import ProfitCalculator from '../../domain/ProfitCaculator';
import WinningLotto from '../../domain/WinningLotto';
import Console from '../../util/Console';
import InputView from '../../view/consoleView/InputView';
import OutputView from '../../view/consoleView/OutputView';
import Validate from '../../domain/Validate';

class LottoController {
  #lottos;

  #winningLotto;

  async start() {
    const purchaseAmount = await this.inputPurchaseAmount();
    OutputView.printEmptyLine();
    const winningNumber = await this.inputWinningNumber();
    OutputView.printEmptyLine();
    const bonusNumber = await this.inputBonusNumber(winningNumber);
    OutputView.printEmptyLine();

    this.#winningLotto = new WinningLotto(winningNumber, bonusNumber);
    this.printResult(purchaseAmount);
    this.inputRestartCommand();
  }

  async inputPurchaseAmount() {
    try {
      const purchaseAmount = await InputView.readPurchaseAmount();
      Validate.purchaseAmount(purchaseAmount);
      this.issueLottos(Number(purchaseAmount));
      return Number(purchaseAmount);
    } catch (error) {
      OutputView.printErrorMessage(error.message);
      return this.inputPurchaseAmount();
    }
  }

  issueLottos(purchaseAmount) {
    const lottoMachine = new LottoMachine(purchaseAmount);
    OutputView.printPurchaseQuantity(lottoMachine.getQuantity());
    this.#lottos = Array.from({ length: lottoMachine.getQuantity() }, () =>
      lottoMachine.issueLotto(),
    );
    OutputView.printLottos(this.#lottos);
  }

  async inputWinningNumber() {
    try {
      const winningNumber = await InputView.readWinningNumber();
      Validate.winningNumber(winningNumber);
      return winningNumber.split(',').map(Number);
    } catch (error) {
      OutputView.printErrorMessage(error.message);
      return this.inputWinningNumber();
    }
  }

  async inputBonusNumber(winningNumber) {
    try {
      const bonusNumber = await InputView.readBonusNumber();
      Validate.bonusNumber(bonusNumber, winningNumber);
      return +bonusNumber;
    } catch (error) {
      OutputView.printErrorMessage(error.message);
      return this.inputBonusNumber(winningNumber);
    }
  }

  printResult(purchaseAmount) {
    const ranking = new Comparer(this.#winningLotto, this.#lottos).getStatistics();
    const profitRate = new ProfitCalculator(ranking).getProfitRate(purchaseAmount);

    OutputView.printStatistics(ranking);
    OutputView.printProfitRate(profitRate);
    OutputView.printEmptyLine();
  }

  async inputRestartCommand() {
    try {
      const restartCommand = await InputView.readRestartCommand();
      Validate.restartCommand(restartCommand);
      this.processRestartCommand(restartCommand);
    } catch (error) {
      OutputView.printErrorMessage(error.message);
      return this.inputRestartCommand();
    }
  }

  processRestartCommand(restartCommand) {
    if (restartCommand === COMMAND.YES) {
      this.start();
    }
    if (restartCommand === COMMAND.NO) {
      Console.close();
    }
  }
}

export default LottoController;
