import InputView from '../view/InputView.js';
import OutputView from '../view/OutputView.js';
import Lotto from './Lotto.js';
import lottoGenerator from './LottoGenerator.js';
import Console from '../utils/Console.js';
import LottoValidator from './LottoValidator.js';
import { LOTTO, COMMAND } from '../constants/index.js';

class LottoController {
  async play() {
    const lottos = await this.#purchase();
    const winningNumber = await this.#handleRead(() => this.#determineWinningNumber(), LottoValidator.checkLottoDuplicate);
    this.#showResult(lottos, winningNumber);
    this.#reStartMenu();
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

  async #purchase() {
    const money = await this.#handleRead(InputView.readMoney, LottoValidator.checkMoney);
    const NumberOfTicket = money / LOTTO.price;
    OutputView.printPurchaseResult(NumberOfTicket);
    const lottos = Array.from({ length: NumberOfTicket }, () => new Lotto(lottoGenerator()));
    lottos.forEach((lotto) => OutputView.printLotto(lotto.getNumbers()));
    OutputView.printNewLine();
    return lottos;
  }

  async #determineWinningNumber() {
    const winningNumber = await this.#handleRead(InputView.readWinningNumber, LottoValidator.checkWinningNumber);
    const mainNumber = winningNumber.split(',');
    OutputView.printNewLine();
    const bonus = await this.#handleRead(InputView.readBonusNumber, LottoValidator.checkBonusNumber);
    return { main: mainNumber, bonus };
  }

  async #reStartMenu() {
    const command = await this.#handleRead(InputView.readRetryCommand, LottoValidator.checkReadRetryCommand);

    return command === COMMAND.restart ? this.play() : Console.close();
  }

  #showResult(lottos, winningNumber) {
    const matchResult = this.#judgeResult(lottos, winningNumber);
    const benefit = this.#calculateBenefit(lottos.length * LOTTO.price, matchResult);
    OutputView.printResult(matchResult);
    OutputView.printBenefit(benefit);
  }

  #calculateBenefit(money, ranks) {
    // eslint-disable-next-line max-params
    const totalPrice = ranks.reduce((accumulator, rank, index) => {
      accumulator += rank * LOTTO.prize[index];
      return accumulator;
    }, 0);
    return (totalPrice / money) * 100;
  }

  #judgeResult(lottos, winningNumber) {
    const rankingCount = Array(LOTTO.prize.length).fill(0);
    return lottos.reduce((acc, lotto) => {
      const ranking = lotto.calculateRanking(winningNumber);
      acc[ranking - 1] += 1;
      return acc;
    }, rankingCount);
  }
}

export default LottoController;
