import LottoComparer from './domain/LottoComparer';
import LottoMachine from './domain/LottoMachine';
import WinningLotto from './domain/WinningLotto';
import calculateProfitRate from './domain/calculateProfitRate';
import * as LottoGameValidator from './domain/validator';

import InputView from './view/console/InputView';
import OutputView from './view/console/OutputView';

import { COMMAND } from './constant/setting';
import ConsoleIO from './util/console/ConsoleIO';
import convertToNumeric from './util/convertToNumeric';

class LottoController {
  #lottoMachine;

  #lottos;

  async start() {
    const purchaseAmount = await this.#inputPurchaseAmount();
    this.#processLottoIssue(purchaseAmount);

    const winningLotto = await this.#makeWinningLotto();
    this.#processLottoComparison(winningLotto);

    const restartCommand = await this.#inputRestartCommand();
    this.#processRestartCommand(restartCommand);
  }

  async #inputPurchaseAmount() {
    try {
      const purchaseAmount = convertToNumeric(await InputView.readPurchaseAmount());
      LottoGameValidator.validatePurchaseAmount(purchaseAmount);
      return purchaseAmount;
    } catch (error) {
      OutputView.printErrorMessage(error.message);
      return this.#inputPurchaseAmount();
    }
  }

  #processLottoIssue(purchaseAmount) {
    this.#lottoMachine = new LottoMachine(purchaseAmount);
    this.#lottos = this.#lottoMachine.issueLottos();

    OutputView.printPurchaseStatus(this.#lottoMachine.getQuantity(), this.#lottos);
  }

  async #inputWinningNumber() {
    try {
      const winningNumber = this.#convertToWinningNumber(await InputView.readWinningNumber());
      LottoGameValidator.validateWinningNumber(winningNumber);
      return winningNumber;
    } catch (error) {
      OutputView.printErrorMessage(error.message);
      return this.#inputWinningNumber();
    }
  }

  #convertToWinningNumber(winningNumberInput) {
    return winningNumberInput.split(',').map((lottoNumberInput) => {
      const lottoNumber = convertToNumeric(lottoNumberInput);
      LottoGameValidator.validateLottoNumber(lottoNumber);
      return lottoNumber;
    });
  }

  async #inputBonusNumber(winningNumber) {
    try {
      const bonusNumber = convertToNumeric(await InputView.readBonusNumber());
      LottoGameValidator.validateBonusNumber(bonusNumber, winningNumber);
      return bonusNumber;
    } catch (error) {
      OutputView.printErrorMessage(error.message);
      return this.#inputBonusNumber(winningNumber);
    }
  }

  async #makeWinningLotto() {
    const winningNumber = await this.#inputWinningNumber();
    OutputView.printEmptyLine();
    const bonusNumber = await this.#inputBonusNumber(winningNumber);
    OutputView.printEmptyLine();

    return new WinningLotto(winningNumber, bonusNumber);
  }

  #processLottoComparison(winningLotto) {
    const lottoComparer = new LottoComparer(winningLotto, this.#lottos);
    const ranking = lottoComparer.getRanking();
    const profitRate = calculateProfitRate(ranking, this.#lottoMachine.getQuantity());

    OutputView.printStatistics(ranking, profitRate);
  }

  async #inputRestartCommand() {
    try {
      const restartCommand = await InputView.readRestartCommand();
      LottoGameValidator.validateRestartCommand(restartCommand);
      return restartCommand;
    } catch (error) {
      OutputView.printErrorMessage(error.message);
      return this.#inputRestartCommand();
    }
  }

  #processRestartCommand(restartCommand) {
    if (restartCommand === COMMAND.YES) {
      this.start();
    }
    if (restartCommand === COMMAND.NO) {
      ConsoleIO.close();
    }
  }
}

export default LottoController;
