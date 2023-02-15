/* eslint-disable max-params */
/* eslint-disable no-unused-vars */
/* eslint-disable max-lines-per-function */
import InputView from '../view/InputView.js';
import OutputView from '../view/OutputView.js';
import Lotto from './Lotto.js';
import lottoGenerator from './LottoGenerator.js';
import InputValidator from '../utils/InputValidator.js';
class LottoController {

  async handleReadMoney() {
    try {
      const money = await InputView.readMoney();
      InputValidator.checkNaturalNumber(money);
      InputValidator.checkFallApart(money, 1000);
      return money;
    } catch (error) {
      OutputView.printError(error);
      this.handleReadMoney();
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
      this.handleReadWinningNumber();
    }
  }

  async handleReadBonusNumber(winningNumber) {
    try {
      const bonusNumber = await InputView.readBonusNumber();
      InputValidator.checkLottoNumber(bonusNumber);
      InputValidator.checkDuplicatedNumbers(winningNumber.split(',').concat(bonusNumber));
      return bonusNumber;
    } catch (error) {
      OutputView.printError(error);
      this.handleReadBonusNumber();
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

    OutputView.printResult(matchResult);
  }

  judgeResult(lottos, winningNumber, bonusNumber) {
    return lottos.reduce((acc, lotto, index) => {
      const matchResult = lotto.matcher(winningNumber, bonusNumber);
      if (matchResult.match === 5) {
        matchResult.bonus ? ++acc[6] : ++acc[4];
      } else {
        acc[matchResult.match] += 1;
      }
      console.log(acc);
      return acc;
    }, [0, 0, 0, 0, 0, 0, 0, 0]); // index 6이 2등
  }
}
export default LottoController;
