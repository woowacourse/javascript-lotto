import LottoMachine from '../domain/lottoMachine.js';
import InputView from '../view/InputView.js';
import OutputView from '../view/OutputView.js';
import Statistics from '../domain/statistics.js';

export default class Controller {
  #lottoMachine;
  #winningLotto;
  #statistics;

  async start() {
    const cost = await InputView.readCost();

    this.#buy(cost);
    this.#winningLotto = await InputView.readWinningLotto();
    this.#calculateStatistics(cost);
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
