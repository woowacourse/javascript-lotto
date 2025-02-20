import CONFIG from '../constants/config.js';

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
    const input = await readLineAsync('> 구입금액을 입력해 주세요.');
    const money = parseInt(input, 10);
    validateMoney(money);
    return money;
  }

  async readWinningLotto() {
    const input = await readLineAsync('\n> 당첨 번호를 입력해 주세요.');
    const winningLotto = input?.split(',').map((item) => parseInt(item, 10));
    validateLottoNumber(winningLotto);
    return winningLotto;
  }

  async readBonus(winningLotto) {
    const input = await readLineAsync('\n> 보너스 번호를 입력해 주세요.');
    const bonus = parseInt(input, 10);
    validateBonus(bonus, winningLotto);
    return bonus;
  }

  async readReStart() {
    const input = await readLineAsync('\n> 다시 시작하시겠습니까? (y/n)');
    if (input.toLowerCase() === 'n') {
      return false;
    }
    return true;
  }
}

export default Controller;
