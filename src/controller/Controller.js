import CONFIG from '../constants/config.js';
import { INPUT_MESSAGE } from '../constants/message.js';

import readLineAsync from '../view/InputView.js';
import OutputView from '../view/OutputView.js';

import Machine from '../domain/model/Machine.js';
import LottoStatistics from '../domain/model/LottoStatistics.js';
import { validateMoney, validateLottoNumber, validateBonus } from '../domain/validation.js';

class Controller {
  #machine;

  #lottoStatistics;

  #money;

  constructor() {
    this.#machine = new Machine();
    this.#lottoStatistics = new LottoStatistics();
    this.#money = CONFIG.INITIAL_NUMBER;
  }

  async start() {
    let condition = true;
    while (condition) {
      await this.buyLottos();
      await this.statisticLottos();
      this.revenueLottos();
      condition = await this.readReStart();
    }
  }

  async buyLottos() {
    this.#money = await this.readMoney();
    this.#machine.createLottos(this.#money);
    OutputView.printLottoQuantity(this.#machine.getLottoQuantity());
    this.#machine.getLottos().forEach((lotto) => (
      OutputView.printSingleLotto(lotto.getNumbers())
    ));
  }

  async statisticLottos() {
    const winningLotto = await this.readWinningLotto();
    const bonus = await this.readBonus(winningLotto);
    const winningNumber = { bonus, lotto: winningLotto };
    this.#lottoStatistics.compareLottos(this.#machine.getLottos(), winningNumber);
    const rankResult = this.#lottoStatistics.getRankResult();
    OutputView.printRankResultHeadLine();
    Object.keys(rankResult).forEach((key) => { OutputView.printRankResult(key, rankResult[key]); });
  }

  async revenueLottos() {
    const profit = this.#lottoStatistics.getProfit();
    const revenueRate = this.#lottoStatistics.calculateRevenueRate(profit, this.#money);
    OutputView.printRevenueRate(revenueRate);
  }

  async readMoney() {
    const input = await readLineAsync(INPUT_MESSAGE.READ_MONEY);
    const money = parseInt(input, 10);
    validateMoney(money);
    return money;
  }

  async readWinningLotto() {
    const input = await readLineAsync(INPUT_MESSAGE.READ_WINNING_LOTTO);
    const winningLotto = input?.split(',').map((item) => parseInt(item, 10));
    validateLottoNumber(winningLotto);
    return winningLotto;
  }

  async readBonus(winningLotto) {
    const input = await readLineAsync(INPUT_MESSAGE.READ_BONUS);
    const bonus = parseInt(input, 10);
    validateBonus(bonus, winningLotto);
    return bonus;
  }

  async readReStart() {
    const ANSWER_NO = 'n';
    const ANSWER_YES = 'y';
    const input = await readLineAsync(INPUT_MESSAGE.READ_RESTART);
    const lowerCaseInput = input.toLowerCase();

    return !(lowerCaseInput === ANSWER_NO) && lowerCaseInput === ANSWER_YES;
  }
}
export default Controller;
