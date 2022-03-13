import {
  LOTTO_PRICE,
  WINNING_RANK_SIZE,
  MATCHED_COUNT,
  LOTTO_INDEX,
  PRIZE,
} from './constants';
import Lotto from '../model/Lotto';

export default class LottoController {
  constructor() {
    this.lottos = [];
    this.winningLottos = [];
  }

  getLottos = () => this.lottos;

  setLottos = lottos => {
    this.lottos = lottos;
  }

  getWinningLottos = () => this.winningLottos;

  setWinningLottos = winningLottos => {
    this.winningLottos = winningLottos;
  }

  resetLotto = (view) => {
    this.setLottos([]);
    this.setWinningLottos([]);
    view.resetView();
  };

  generateLottos = (moneyInput) => {
    const numberOfLottos = parseInt(moneyInput / LOTTO_PRICE);
    for (let i = 0; i < numberOfLottos; i += 1) {
      this.lottos.push(new Lotto());
    }
  };

  getHowManyMatched = lotto => {
    let matchedCount = 0;

    this.winningLottos.forEach((winningNumber, index) => {
      if (index === LOTTO_INDEX.BONUS) return;
      if (lotto.find(number => number === winningNumber)) {
        matchedCount += 1;
      }
    });
    return matchedCount;
  };

  saveMatchedCount = () => {
    this.lottos.forEach(lotto => {
      const matchedCount = this.getHowManyMatched(lotto.lottoNumbers);
      if (matchedCount >= MATCHED_COUNT.MIN) {
        lotto.setMatchedCount(matchedCount);
      }
    });
  };

  #isSecondPlace = winner => {
    return winner.matchedCount === MATCHED_COUNT.FIVE_MATCHED
           && winner.lottoNumbers.find(number => number === this.winningLottos[LOTTO_INDEX.BONUS]);
  };

  #isFirstPlace = matchedCount => matchedCount === MATCHED_COUNT.SIX_MATCHED;

  getWinnerStatistic = () => {
    const winnerStatistic = new Array(WINNING_RANK_SIZE).fill(0);
    const winners = this.lottos.filter(lotto => lotto.matchedCount >= MATCHED_COUNT.MIN);

    winners.forEach(winner => {
      if (this.#isSecondPlace(winner) || this.#isFirstPlace(winner.getMatchedCount())) {
        winnerStatistic[winner.getMatchedCount() - 2] += 1;
        return;
      }
      winnerStatistic[winner.getMatchedCount() - 3] += 1;
    });
    return winnerStatistic;
  };

  getEarningsRate = (winnerStatistic, moneyInput) => {
    const cost = +moneyInput;
    const prizes = [
      PRIZE.FIFTH_PLACE,
      PRIZE.FOURTH_PLACE,
      PRIZE.THIRD_PLACE,
      PRIZE.SEONCD_PLACE,
      PRIZE.FIRST_PLACE
    ];
    const profit = winnerStatistic
                  .map((matchedCount, index) => matchedCount * prizes[index])
                  .reduce((sum, currentValue) => sum + currentValue, 0);
    return Math.round((profit - cost) / cost * 100);
  };

  generateResult = (winningNumbers, moneyInput) => {
    this.setWinningLottos(winningNumbers.map(number => +number));
    this.saveMatchedCount();
    const winnerStatistic = this.getWinnerStatistic();
    const earningsRate = this.getEarningsRate(winnerStatistic, moneyInput);
    return { winnerStatistic, earningsRate };
  } 
}
