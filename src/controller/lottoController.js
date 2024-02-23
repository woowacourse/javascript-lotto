/* eslint-disable */
import Lotto from '../domain/lotto.js';
import LottoMachine from '../domain/lottoMachine.js';
import WinningLotto from '../domain/winningLotto.js';
import InputView from '../view/InputView.js';
import OutputView from '../view/OutputView.js';
import Statistics from '../domain/statistics.js';

export default class Controller {
  #lottoMachine;

  async start() {
    const cost = await InputView.readCost();
    this.#lottoMachine = new LottoMachine(cost);
    OutputView.printBuyCount(this.#lottoMachine.getLottoCount);
    this.#lottoMachine.getLottoNumbers.forEach((numbers) => {
      OutputView.printLotto(numbers);
    });

    const winningLotto = await InputView.readWinningLotto();

    const statistics = new Statistics({
      lottos: this.#lottoMachine.getLottoNumbers,
      winningLotto: winningLotto.getLottoNumbers,
      bonusNumber: winningLotto.getBonusNumber,
      cost,
    });
    OutputView.printResult(statistics.getResult);
    OutputView.printProfit(statistics.getProfit);
  }
}
