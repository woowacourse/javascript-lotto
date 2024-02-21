import LottoMachine from './LottoMachine';
import Statistics from './Statistics';
import WinningLotto from './WinningLotto';

class LottoGame {
  // 관리하는 데이터 - paymentAmount : number, lottoTickets:number[]
  #lottoMachine;

  // 관리하는 데이터 - lottoNumbers :number[], bonuseNumber:number
  #winningLotto;

  // 관리하는 데이터 - {isBonus:boolean, matchedCoung:number}[]
  #matchingResults;

  // 관리하는 데이터 - totalPrizes:number, profitRate:number
  #statistics;

  insertMoney(paymentAmountInput) {
    this.#lottoMachine = new LottoMachine(paymentAmountInput);
  }

  generateWinningLotto(lottoNumbersInput, bonusNumberInput) {
    this.#winningLotto = new WinningLotto(lottoNumbersInput, bonusNumberInput);
  }

  calculateMatchingResult() {
    this.#matchingResults = this.#lottoMachine.lottoTickets.map((lottoTicket) =>
      // console.log(lottoTicket);
      this.#winningLotto.compareLotto(lottoTicket),
    );
  }

  calculateStatistics() {
    this.#statistics = new Statistics();
    this.#statistics.checkTickets(this.#matchingResults);
    this.#statistics.calculateProfitRate(this.#lottoMachine.paymentAmount);
  }
}

export default LottoGame;
