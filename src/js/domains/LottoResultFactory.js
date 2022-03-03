import LottoResult from './LottoResult';

export default class LottoResultFactory {
  static createLottoResult(numberOfMatches, hasBonus) {
    if (numberOfMatches === 3) return new LottoResult('fifth', 5000);
    if (numberOfMatches === 4) return new LottoResult('fourth', 50000);
    if (numberOfMatches === 5 && hasBonus) {
      return new LottoResult('second', 30000000);
    }
    if (numberOfMatches === 5) return new LottoResult('third', 1500000);
    if (numberOfMatches === 6) return new LottoResult('first', 2000000000);
    return new LottoResult('꽝', 0);
  }
}
