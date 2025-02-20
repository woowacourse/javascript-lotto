import CONFIG from '../constants/config.js';

import OutputView from '../view/OutputView.js';
import InputView from '../view/InputView.js';

import Machine from '../domain/model/Machine.js';
import LottoStatistics from '../domain/model/LottoStatistics.js';

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
      await this.statisticsLottos();
      this.makeProfit();
      condition = await InputView.readReStart();
    }
  }

  async buyLottos() {
    this.#money = await InputView.readMoney();
    this.#machine.createLottos(this.#money);
    OutputView.printLottoQuantity(this.#machine.getLottoQuantity());
    this.#machine.getLottos().forEach((lotto) => (
      OutputView.printSingleLotto(lotto.getNumbers())
    ));
  }

  async statisticsLottos() {
    const winningLotto = await InputView.readWinningLotto();
    const bonus = await InputView.readBonus(winningLotto);
    const winningNumber = { bonus, lotto: winningLotto };
    this.#lottoStatistics.compareLottos(this.#machine.getLottos(), winningNumber);
    const rankResult = this.#lottoStatistics.getRankResult();
    OutputView.printRankResultHeadLine();
    Object.keys(rankResult).forEach((key) => { OutputView.printRankResult(key, rankResult[key]); });
  }

  async makeProfit() {
    const profit = this.#lottoStatistics.getProfit();
    const revenueRate = this.#lottoStatistics.calculateRevenueRate(profit, this.#money);
    OutputView.printRevenueRate(revenueRate);
  }
}
export default Controller;
