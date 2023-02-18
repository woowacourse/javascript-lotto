import {
  PRIZE,
  MINIMUM_LOTTO_UNIT,
  WINNING_ORDER,
  LOTTO_LENGTH,
  MIN_LOTTO_NUMBER,
  MAX_LOTTO_NUMBER,
  CONVERT_RANK_TO_STRING,
} from '../data/Constants';
import { arrayToObjectThatValueZero, deduplicateArray } from '../utils/Utils';
import GameBoard from './GameBoard';
import Lotto from './Lotto';

class LottoGame {
  #gameBoard;
  #lottos;

  purchaseLottos(price) {
    const lottoCount = price / MINIMUM_LOTTO_UNIT;

    this.#lottos = Array.from(
      { length: lottoCount },
      () => new Lotto(this.issueLotteryNumber())
    );
  }

  issueLotteryNumber() {
    return deduplicateArray(LOTTO_LENGTH, [MIN_LOTTO_NUMBER, MAX_LOTTO_NUMBER]);
  }

  getLottoNumbers() {
    return this.#lottos.map((lotto) => lotto.lottoNumber);
  }

  registerGameBoard(winningNumber, bonusNumber) {
    this.#gameBoard = new GameBoard(winningNumber, bonusNumber);
  }

  getLottosRank() {
    return this.#lottos.map(
      (lotto) => CONVERT_RANK_TO_STRING[this.#gameBoard.getLotteResult(lotto)]
    );
  }

  getLottosWinCount() {
    const initialLottoResults = arrayToObjectThatValueZero(WINNING_ORDER);
    const lottosRankResult = this.getLottosRank();

    lottosRankResult.forEach((rank) => (initialLottoResults[rank] += 1));

    return initialLottoResults;
  }

  calculateTotalPrize(ranks) {
    return ranks.reduce((acc, cur) => (acc += PRIZE[cur]), 0);
  }
}

export default LottoGame;
