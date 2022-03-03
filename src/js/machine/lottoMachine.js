import LottoPurchaseMachine from './lottoPurchaseMachine';
import MatchCalculateMachine from './matchCalculateMachine';

export default class LottoMachine {
  constructor() {
    this.purchaseMachine = new LottoPurchaseMachine();
    this.calculateMachine = new MatchCalculateMachine();
    this.lottoArray = [];
  }

  buyLotto(cash) {
    this.lottoArray = this.purchaseMachine.buyLotto(cash);
    return [...this.lottoArray];
  }

  getMatches(winnerNumbers) {
    return this.calculateMachine.getMatches(this.lottoArray, winnerNumbers);
  }

  resetData() {
    this.lottoArray = [];
  }
}
