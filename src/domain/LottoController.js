import InputView from '../view/InputView.js';
import OutputView from '../view/OutputView.js';
import Lotto from './Lotto.js';
import lottoGenerator from './LottoGenerator.js';
import Console from '../utils/Console.js';
import LottoValidator from './LottoValidator.js';
import { LOTTO, COMMAND } from '../constants/index.js';
import { generateLottos } from './generateLottos.js';

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
    const matchResult = this.#judgeResult();
    const benefit = this.calculateBenefit(this.lottos.length * 1000, matchResult);
    OutputView.printResult(matchResult);
    OutputView.printBenefit(benefit);
  }


  calculateBenefit(total, rank) {
    // eslint-disable-next-line max-params
    const income = rank.reduce((acc, number, index) => {
      acc += number * LOTTO.prize[index];
      return acc;
    }, 0);

    return income / total * 100;
  }

  #judgeResult() {
    const rankingCount = Array(LOTTO.prize.length).fill(0);

    return this.lottos.reduce((acc, lotto) => {
      const ranking = lotto.calculateRanking(this.winningNumber);
      acc[ranking - 1] += 1;
      return acc;
    }, rankingCount);
  }
}

export default LottoController;
