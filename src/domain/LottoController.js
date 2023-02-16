/* eslint-disable max-params */
/* eslint-disable no-unused-vars */
import InputView from '../view/InputView.js';
import OutputView from '../view/OutputView.js';
import Lotto from './Lotto.js';
import lottoGenerator from './LottoGenerator.js';
import InputValidator from '../utils/InputValidator.js';
import Console from '../utils/Console.js';
import LottoValidator from './LottoValidator.js';
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
      return this.handleRead(read, validation);
    }
  }

  #purchase(money) {
    OutputView.printPurchaseResult(money / 1000);
    const lottos = Array.from({ length: money / 1000 }, () => new Lotto(lottoGenerator()));
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

    return command === 'y' ? this.play() : Console.close();
  }

  #calculateBenefit(money, rank) {
    const PRIZE = [0, 2000000000, 30000000, 1500000, 50000, 5000];
    const income = rank.reduce((acc, number, index) => {
      acc += number * PRIZE[index];
      return acc;
    }, 0);
    return income / money * 100;
  }

  #judgeResult(lottos) {
    return lottos.reduce((acc, lotto, index) => {
      const ranking = lotto.calculateRanking(this.#winningNumber, this.#bonusNumber);
      acc[ranking] += 1;
      return acc;
    }, [0, 0, 0, 0, 0, 0]);
  }
}

export default LottoController;
