import pickLotto from '../domain/pickLotto.js';
import ScoreBoard from './ScoreBoard.js';

class LottoGame {
  #lottos;
  #scoreBoard;

  constructor(money) {
    const lottoCount = money / 1_000;
    this.#lottos = Array.from({ length: lottoCount }, () => pickLotto());
    this.#scoreBoard = new ScoreBoard(lottoCount);
  }

  getLottoMatchedResult(lotto, winningLotto, bonusNumber) {
    const matchedCount = this.getMatchedLottoCount(lotto, winningLotto);
    const hasBonusNumber = this.checkBonusNumber(lotto, bonusNumber);
    const lottoMatchedResult = { matchedCount, hasBonusNumber };

    return lottoMatchedResult;
  }

  getMatchedLottoCount(lotto, winningLotto) {
    const matchedCount = winningLotto.filter((lottoNumber) => lotto.includes(lottoNumber)).length;

    return matchedCount;
  }

  checkBonusNumber(lotto, bonusNumber) {
    if (lotto.includes(bonusNumber)) {
      return true;
    }

    return false;
  }

  getRank(matchedCount, hasBonusNumber) {
    if (matchedCount === 6) return 1;
    if (matchedCount === 5 && hasBonusNumber) return 2;
    if (matchedCount === 5) return 3;
    if (matchedCount === 4) return 4;
    if (matchedCount === 3) return 5;

    return 0;
  }

  getWinningStatus(winningLotto, bonusNumber) {
    this.#lottos.forEach((lotto) => {
      const { matchedCount, hasBonusNumber } = this.getLottoMatchedResult(
        lotto,
        winningLotto,
        bonusNumber
      );
      const rank = getRank(matchedCount, hasBonusNumber);
      this.#scoreBoard.writeBoard(rank);
    });
    return this.#scoreBoard.getBoard();
  }

  getProfitRate() {
    return this.#scoreBoard.getProfitRate();
  }
}

export default LottoGame;
