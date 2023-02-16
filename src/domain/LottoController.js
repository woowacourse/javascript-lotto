import InputView from '../view/InputView.js';
import OutputView from '../view/OutputView.js';
import Lotto from './Lotto.js';
import lottoGenerator from './LottoGenerator.js';
import Console from '../utils/Console.js';
import LottoValidator from './LottoValidator.js';
import { LOTTO, COMMAND } from '../constants/index.js';

class LottoController {
  #winningNumber;

  #bonusNumber;

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

  #purchase(money) {
    OutputView.printPurchaseResult(money / LOTTO.price);
    const lottos = Array.from({ length: money / LOTTO.price }, () => new Lotto(lottoGenerator()));
    lottos.forEach((lotto) => {
      OutputView.printLotto(lotto.getNumbers());
    });
    OutputView.printNewLine();
    return lottos;
  }

  async #determineWinningNumber() {
    this.#winningNumber = (await this.#handleRead(InputView.readWinningNumber, LottoValidator.checkWinningNumber)).split(',');
    OutputView.printNewLine();
    this.#bonusNumber = await this.#handleRead(InputView.readBonusNumber, LottoValidator.checkBonusNumber);
  }

  #showResult(lottos, money) {
    const matchResult = this.#judgeResult(lottos);
    const benefit = this.#calculateBenefit(money, matchResult);
    OutputView.printResult(matchResult);
    OutputView.printBenefit(benefit);
  }

  async play() {
    const money = await this.#handleRead(InputView.readMoney, LottoValidator.checkMoney);
    const lottos = this.#purchase(money);
    await this.#determineWinningNumber();
    this.#showResult(lottos, money);
    const command = await this.#handleRead(InputView.readRetryCommand, LottoValidator.checkReadRetryCommand);

    return command === COMMAND.restart ? this.play() : Console.close();
  }

  #calculateBenefit(money, rank) {
    // eslint-disable-next-line max-params
    const income = rank.reduce((acc, number, index) => {
      acc += number * LOTTO.prize[index];
      return acc;
    }, 0);
    return income / money * 100;
  }

  #judgeResult(lottos) {
    const rankingCount = Array(LOTTO.prize.length).fill(0);
    return lottos.reduce((acc, lotto) => {
      const ranking = lotto.calculateRanking(this.#winningNumber, this.#bonusNumber);
      acc[ranking - 1] += 1;
      return acc;
    }, rankingCount);
  }
}

export default LottoController;
