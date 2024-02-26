import LottoMachine from '../domain/lottoMachine.js';
import Lotto from '../domain/lotto.js';
import WinningLotto from '../domain/winningLotto.js';
import InputView from '../view/console/InputView.js';
import OutputView from '../view/console/OutputView.js';
import Statistics from '../domain/statistics.js';
import { INPUT_MESSAGES } from '../constant/messages.js';
import { validateCost, validateNumber } from '../utils/validation.js';

export default class Controller {
  #lottoMachine;
  #winningLotto;
  #statistics;

  async start() {
    const cost = await InputView.readNumber(INPUT_MESSAGES.cost, validateCost);

    this.#buy(cost);
    this.#winningLotto = await this.#generateWinningLotto();
    this.#calculateStatistics(cost);
  }

  async #generateLotto() {
    try {
      const numbers = await InputView.readWinningNumbers();

      return new Lotto(numbers);
    } catch (error) {
      console.log(error.message);
      return this.#generateLotto();
    }
  }

  async #generateWinningLotto() {
    try {
      const lotto = await this.#generateLotto();
      const bonusNumber = await InputView.readNumber(INPUT_MESSAGES.bonusNumber, validateNumber);

      return new WinningLotto(lotto, bonusNumber);
    } catch (error) {
      console.log(error.message);
      return this.#generateWinningLotto();
    }
  }

  #buy(cost) {
    this.#lottoMachine = new LottoMachine(cost);

    this.#printLottoTickets();
  }

  #printLottoTickets() {
    OutputView.printBuyCount(this.#lottoMachine.getLottoCount);
    this.#lottoMachine.getLottoNumbers.forEach((numbers) => {
      OutputView.printLotto(numbers);
    });
  }

  #calculateStatistics(cost) {
    this.#statistics = new Statistics({
      lottos: this.#lottoMachine.getLottoNumbers,
      winningLotto: this.#winningLotto.getLottoNumbers,
      bonusNumber: this.#winningLotto.getBonusNumber,
      cost,
    });

    this.#printStatistics();
  }

  #printStatistics() {
    OutputView.printResult(this.#statistics.getResult);
    OutputView.printProfit(this.#statistics.getProfit);
  }
}
