import LottoMachine from './LottoMachine';
import Statistics from './Statistics';

class LottoGame {
  #lottoMachine;

  #statistics;

  insertMoney(paymentAmountInput) {
    this.#lottoMachine = new LottoMachine(paymentAmountInput);
  }

  issueWinningLotto(lottoNumbersInput, bonusNumberInput) {
    this.#lottoMachine.issueWinningLotto(lottoNumbersInput, bonusNumberInput);
  }

  calculateStatistics() {
    const { matchingResults, paymentAmount } = this.#lottoMachine;

    this.#statistics = new Statistics();
    this.#statistics.checkTickets(matchingResults);
    this.#statistics.calculateProfitRate(paymentAmount);
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
