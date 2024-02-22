import LottoMachine from './LottoMachine';
import Statistics from './Statistics';
import WinningLotto from './WinningLotto';

class LottoGame {
  // 관리하는 데이터 - paymentAmount : number, lottoTickets:number[]
  #lottoMachine;

  // 관리하는 데이터 - lottoNumbers :number[], bonuseNumber:number
  #winningLotto = new WinningLotto();

  // 관리하는 데이터 - {isBonus:boolean, matchedCoung:number}[]
  #matchingResults;

  // 관리하는 데이터 - totalPrizes:number, profitRate:number
  #statistics;

  set winningLottoNumbers(lottoNumbersInput) {
    this.#winningLotto.lottoNumbers = lottoNumbersInput;
  }

  set bonusNumber(bonusNumberInput) {
    this.#winningLotto.bonusNumber = bonusNumberInput;
  }

  insertMoney(paymentAmountInput) {
    this.#lottoMachine = new LottoMachine(paymentAmountInput);
  }

  calculateMatchingResult() {
    this.#matchingResults = this.#lottoMachine.lottoTickets.map((lottoTicket) =>
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
