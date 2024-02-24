import LottoMachine from './LottoMachine';
import Statistics from './Statistics';
import WinningLotto from './WinningLotto';

class LottoGame {
  #lottoMachine;

  #winningLotto;

  #matchingResults;

  #statistics;

  insertMoney(paymentAmountInput) {
    this.#lottoMachine = new LottoMachine(paymentAmountInput);
  }

  calculateMatchingResult() {
    this.matchingResults = this.lottoMachine.lottoTickets.map((lottoTicket) =>
      this.winningLotto.compareLotto(lottoTicket),
    );
  }

  calculateStatistics() {
    this.#statistics = new Statistics();
    this.#statistics.checkTickets(this.#matchingResults);
    this.#statistics.calculateProfitRate(this.#lottoMachine.paymentAmount);
  }

  set winningLottoNumbers(lottoNumbersInput) {
    this.#winningLotto.lottoNumbers = lottoNumbersInput;
  }

  set bonusNumber(bonusNumberInput) {
    this.#winningLotto.bonusNumber = bonusNumberInput;
  }

  get lottoTickets() {
    return this.#lottoMachine.lottos;
  }

  get lottoAnalytics() {
    return {
      profitRate: this.#statistics.profitRate,
      statisticsResult: this.#statistics.statisticsResult,
    };
  }
}

export default LottoGame;
