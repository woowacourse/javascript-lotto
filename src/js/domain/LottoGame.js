import pickLotto from './pickLotto.js';
import ScoreBoard from './ScoreBoard.js';
import { GAME_VALUE } from '../constants/index.js';

class LottoGame {
  #lottos;
  #scoreBoard;

  constructor(money) {
    const lottoCount = money / GAME_VALUE.LOTTO_PRICE;
    this.#lottos = Array.from({ length: lottoCount }, () => pickLotto());
    this.#scoreBoard = new ScoreBoard(lottoCount);
  }

  getBoughtLottos() {
    return this.#lottos;
  }

  getMatchedLottoCount(lotto, winningLotto) {
    const matchedCount = winningLotto.filter((lottoNumber) => lotto.includes(lottoNumber)).length;

    return matchedCount;
  }

  hasBonusNumber(lotto, bonusNumber) {
    return lotto.includes(bonusNumber);
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
      const matchedCount = this.getMatchedLottoCount(lotto, winningLotto);
      const hasBonusNumber = this.hasBonusNumber(lotto, bonusNumber);
      const rank = this.getRank(matchedCount, hasBonusNumber);
      this.#scoreBoard.writeBoard(rank);
    });

    return this.#scoreBoard.getBoard();
  }

  getProfitRate() {
    return this.#scoreBoard.getProfitRate();
  }
}

export default LottoGame;
