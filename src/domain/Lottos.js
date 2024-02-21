import Lotto from './Lotto';

class Lottos {
  #lottos;

  constructor(lottoList) {
    this.#lottos = lottoList.map((lotto) => new Lotto(lotto));
  }

  getWinningResults(winningNumbers, bonusNumber) {
    const initWinnningResults = {
      FIRST: 0,
      SECOND: 0,
      THIRD: 0,
      FOURTH: 0,
      FIFTH: 0,
    };

    const ranking = {
      3: 'FIFTH',
      4: 'FOURTH',
      5: 'THIRD',
      6: 'FIRST',
      7: 'SECOND',
    };

    this.#lottos.forEach((lotto) => {
      const result = lotto.countMatchedNumbers(winningNumbers);
      if (result >= 3) {
        const key = result === 5 && lotto.hasNumber(bonusNumber) ? result + 2 : result;
        initWinnningResults[ranking[key]] += 1;
      }
    });
    return initWinnningResults;
  }
}

export default Lottos;
