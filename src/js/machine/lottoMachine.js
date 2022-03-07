import generateLottos from './generateLottos';
import calculateNumberMatch from './calculateNumberMatch';

export default class LottoMachine {
  constructor() {
    this.lottoArray = [];
  }

  buyLotto(cash) {
    this.lottoArray = generateLottos(cash);
    return [...this.lottoArray];
  }

  getNumberMatches(winnerNumbers) {
    return calculateNumberMatch(this.lottoArray, winnerNumbers);
  }

  resetData() {
    this.lottoArray = [];
  }
}
