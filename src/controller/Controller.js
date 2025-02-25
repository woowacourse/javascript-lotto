import OutputView from '../view/OutputView.js';
import InputView from '../view/InputView.js';
import LottoMachine from '../domain/model/LottoMachine.js';
import LottoStatistics from '../domain/model/LottoStatistics.js';
import { ANSWER, INITIAL_NUMBER } from '../domain/constants.js';

class Controller {
  #machine;

  #lottoStatistics;

  #money;

  constructor() {
    this.#money = INITIAL_NUMBER;
  }

  async start() {
    await this.lottoInit();
    await this.buyLottos();
    await this.statisticsLottos();
    this.makeProfit();
    await this.restart();
  }

  async lottoInit() {
    this.#machine = new LottoMachine();
    this.#lottoStatistics = new LottoStatistics();
  }

  async buyLottos() {
    this.#money = await InputView.readMoney();
    this.#machine.createLottos(this.#money);
    OutputView.printLottoQuantity(this.#machine.getLottoQuantity());
    this.#machine
      .getLottos()
      .forEach((lotto) => OutputView.printSingleLotto(lotto.getNumbers()));
  }

  async statisticsLottos() {
    const winningLotto = await InputView.readWinningLotto();
    const bonus = await InputView.readBonus(winningLotto);
    const winningNumber = { bonus, lotto: winningLotto };
    this.#lottoStatistics.compareLottos(
      this.#machine.getLottos(),
      winningNumber,
    );
    const rankResult = this.#lottoStatistics.getRankResult();
    OutputView.printRankResultHeadLine();
    Object.keys(rankResult).reduceRight((_, key) => {
      OutputView.printRankResult(key, rankResult[key]);
    }, null);
  }

  async makeProfit() {
    const profit = this.#lottoStatistics.getProfit();
    const revenueRate = this.#lottoStatistics.calculateRevenueRate(
      profit,
      this.#money,
    );
    OutputView.printRevenueRate(revenueRate);
  }

  async restart() {
    const conditionValue = await InputView.readReStart();
    if (conditionValue === ANSWER.RE_START) {
      await this.start();
    }
  }
}
export default Controller;
