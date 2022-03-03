import LottoPurchaseMachine from './lottoPurchaseMachine';
import LottoWinnerMachine from './lottoWinnerMachine';

export default class LottoMachine {
  constructor() {
    this.purchaseMachine = new LottoPurchaseMachine();
    this.winnerMachine = new LottoWinnerMachine();
    this.lottoArray = [];
  }

  buyLotto(cash) {
    this.lottoArray = this.purchaseMachine.buyLotto(cash);
    return [...this.lottoArray];
  }

  getMatches(winnerNumbers) {
    return this.winnerMachine.getMatches(this.lottoArray, winnerNumbers);
  }

  resetData() {
    this.lottoArray = [];
  }
}
