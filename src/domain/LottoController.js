import InputView from '../view/InputView.js';
import OutputView from '../view/OutputView.js';
import Console from '../utils/Console.js';
import LottoValidator from './LottoValidator.js';
import { LOTTO, COMMAND } from '../constants/index.js';
import { generateLottos } from './generateLottos.js';
import { judgeResult } from './judgeResult.js';
import { calculateBenefit } from './calculateBenefit.js';


class LottoController {

  async play() {
    const money = await this.#handleRead(InputView.readMoney, LottoValidator.checkMoney);
    this.lottos = this.purchase(money);
    this.winningNumber = await this.#handleRead(this.#determineWinningNumber.bind(this), LottoValidator.checkLottoDuplicate);
    this.#showResult();
    const command = await this.#handleRead(InputView.readRetryCommand, LottoValidator.checkReadRetryCommand);

    return command === COMMAND.restart ? this.play() : Console.close();
  }

  async #handleRead(read, validation) {
    try {
      const value = await read();
      validation(value);
      return value;
    } catch (error) {
      OutputView.printError(error);
      return this.#handleRead(read, validation);
    }
  }

  purchase(money) {
    OutputView.printPurchaseResult(money / LOTTO.price);
    const lottos = generateLottos(money);
    lottos.forEach((lotto) => {
      OutputView.printLotto(lotto.getNumbers());
    });
    OutputView.printNewLine();

    return lottos;
  }

  async #determineWinningNumber() {
    const main = (await this.#handleRead(InputView.readWinningNumber, LottoValidator.checkWinningNumber)).split(',');
    OutputView.printNewLine();
    const bonus = await this.#handleRead(InputView.readBonusNumber, LottoValidator.checkBonusNumber);

    return { main, bonus };
  }

  #showResult() {
    const matchResult = judgeResult(this.lottos, this.winningNumber);
    const benefit = calculateBenefit(this.lottos.length * 1000, matchResult);
    OutputView.printResult(matchResult);
    OutputView.printBenefit(benefit);
  }

}

export default LottoController;
