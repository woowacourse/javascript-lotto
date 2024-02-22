import LottoMachine from '../domain/LottoMachine.js';
import Lottos from '../domain/Lottos.js';
import readInput from '../util/readInput.js';
import InputView from '../view/InputView.js';
import OutputView from '../view/OutputView.js';
import Validator from '../validator/Validator.js';

class LottoGameController {
  async play() {
    const purchaseAmount = await readInput(this.#readPurchaseAmount);
    const lottoList = new LottoMachine(purchaseAmount).getLottoNumberList();
    const lottos = new Lottos(lottoList);
    OutputView.printPurchaseResult(lottoList);

    const winningNumbers = await readInput(this.#readWinningNumbers);
    const bonusNumber = await readInput(() => this.#readBonusNumber(winningNumbers));
    const winningResults = lottos.getWinningResults(winningNumbers, bonusNumber);
    OutputView.printWinningResults(winningResults);

    const restartCommand = await readInput(this.#readRestartCommand);
    this.#restartGame(restartCommand);
  }

  async #readPurchaseAmount() {
    const purchaseAmount = await InputView.readPurchaseAmount();
    Validator.validatePurchaseAmount(purchaseAmount);
    return parseInt(purchaseAmount);
  }

  async #readWinningNumbers() {
    const winningNumbers = await InputView.readWinningNumbers();
    Validator.validateWinningNumbers(winningNumbers);
    return winningNumbers.split(',').map((number) => parseInt(number.trim()));
  }

  async #readBonusNumber(winningNumbers) {
    const bonusNumber = await InputView.readBonusNumber();
    Validator.validateBonusNumber(bonusNumber, winningNumbers);
    return parseInt(bonusNumber);
  }

  async #readRestartCommand() {
    const restartCommand = await InputView.readRestartCommand();
    Validator.validateRestartCommand(restartCommand);
    return restartCommand;
  }

  #restartGame(restartCommand) {
    if (restartCommand === 'y' || restartCommand === 'Y') {
      this.play();
    }
    if (restartCommand === 'n' || restartCommand === 'N') {
      OutputView.printExitMessage();
      return;
    }
  }
}

export default LottoGameController;
