import { MATCH_RANK } from '../data/Constants';

class GameBoard {
  #winningNumber;
  #bonusNumber;

  constructor(inputWinningNumber, bonusNumber) {
    this.#winningNumber = inputWinningNumber;
    this.#bonusNumber = bonusNumber;
  }

  getMatchCount(lottoNumber) {
    const set = new Set(lottoNumber);
    const checkCount = this.#winningNumber.filter((number) => set.has(number));

    return checkCount.length;
  }

  getLotteResult(lotto) {
    const lottoNumber = lotto.lottoNumber;
    const matchCount = this.getMatchCount(lottoNumber);
    if (matchCount < 3) return MATCH_RANK.NONE;
    if (matchCount === 3) return MATCH_RANK.FIFTH;
    if (matchCount === 4) return MATCH_RANK.FOURTH;
    if (matchCount === 5 && lottoNumber.includes(this.#bonusNumber))
      return MATCH_RANK.SECOND;
    if (matchCount === 5) return MATCH_RANK.THIRD;
    if (matchCount === 6) return MATCH_RANK.FIRST;
  }
}

export default GameBoard;
