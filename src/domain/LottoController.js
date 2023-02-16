/* eslint-disable max-params */
/* eslint-disable no-unused-vars */
/* eslint-disable max-lines-per-function */
import InputView from '../view/InputView.js';
import OutputView from '../view/OutputView.js';
import Lotto from './Lotto.js';
import lottoGenerator from './LottoGenerator.js';
import InputValidator from '../utils/InputValidator.js';
import Console from '../utils/Console.js';
class LottoController {

  async handleReadMoney() {
    try {
      const money = await InputView.readMoney();
      InputValidator.checkNaturalNumber(money);
      InputValidator.checkFallApart(money, 1000);
      return money;
    } catch (error) {
      OutputView.printError(error);
      return this.handleReadMoney();
    }
  }

  async handleReadWinningNumber() {
    try {
      const winningNumber = await InputView.readWinningNumber();
      winningNumber.split(',').forEach((number) => {
        InputValidator.checkLottoNumber(number);
      });
      InputValidator.checkDuplicatedNumbers(winningNumber.split(','));
      return winningNumber;
    } catch (error) {
      OutputView.printError(error);
      return this.handleReadWinningNumber();
    }
  }

  async handleReadBonusNumber(winningNumber) {
    try {
      const bonusNumber = await InputView.readBonusNumber();
      InputValidator.checkLottoNumber(bonusNumber);
      InputValidator.checkDuplicatedNumbers(winningNumber.join('').concat(bonusNumber).split(','));
      return bonusNumber;
    } catch (error) {
      OutputView.printError(error);
      return this.handleReadBonusNumber();
    }
  }

  async handleRetryCommand() {
    try {
      const command = await InputView.readRetryCommand();
      InputValidator.checkRetryCommand(command);
      return command;
    } catch (error) {
      OutputView.printError(error);
      return this.handleRetryCommand();
    }
  }

  async play() {
    const money = await this.handleReadMoney();
    OutputView.printPurchaseResult(money / 1000);
    const lottos = Array.from({ length: money / 1000 }, () => new Lotto(lottoGenerator()));
    lottos.forEach((lotto) => {
      OutputView.printLotto(lotto);
    });
    OutputView.printNewLine();

    const winningNumber = (await this.handleReadWinningNumber()).split(',');
    OutputView.printNewLine();
    const bonusNumber = await this.handleReadBonusNumber(winningNumber);
    OutputView.printNewLine();

    const matchResult = this.judgeResult(lottos, winningNumber, bonusNumber);
    const benefit = this.calculateBenefit(money, matchResult);

    OutputView.printResult(matchResult, benefit);
    const command = await this.handleRetryCommand();
    return command === 'y' ? this.play() : Console.close();
  }



  calculateBenefit(money, rank) {
    const PRIZE = [0, 2000000000, 30000000, 1500000, 50000, 5000];
    const income = rank.reduce((acc, number, index) => {
      acc += number * PRIZE[index];
      return acc;
    }, 0);
    return income / money * 100;
  }

  judgeResult(lottos, winningNumber, bonusNumber) {
    return lottos.reduce((acc, lotto, index) => {
      const result = lotto.matcher(winningNumber, bonusNumber);
      acc[result] += 1;
      return acc;
    }, [0, 0, 0, 0, 0, 0]); // index 6이 2등
  }
}

export default LottoController;
