import { GAME_VALUE } from '../constants/index.js';

const RANK_FORMAT = {
  1: 'first',
  2: 'second',
  3: 'third',
  4: 'fourth',
  5: 'fifth',
};

class ScoreBoard {
  #board;
  #lottoCount;

  constructor(lottoCount) {
    this.#board = {
      first: 0,
      second: 0,
      third: 0,
      fourth: 0,
      fifth: 0,
    };
    this.#lottoCount = lottoCount;
  }

  writeBoard(rank) {
    if (rank === 0) {
      return;
    }

    const convertedRank = RANK_FORMAT[rank];
    this.#board[convertedRank] += 1;
  }

  getBoard() {
    return this.#board;
  }

  #getTotalPrize() {
    const totalPrize = Object.values(this.#board).reduce((totalPrize, winCount, index) => {
      return totalPrize + winCount * GAME_VALUE.PRIZE[index];
    }, 0);

    return totalPrize;
  }

  getProfitRate() {
    const totalPrize = this.#getTotalPrize();
    const profitRate = (totalPrize / (this.#lottoCount * GAME_VALUE.LOTTO_PRICE)) * 100;

    return profitRate;
  }
}

export default ScoreBoard;
