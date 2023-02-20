import { GAME_VALUE, RANK } from '../constants/index.js';

class ScoreBoard {
  #board;
  #lottoCount;

  constructor(lottoCount) {
    this.#board = Array.from({ length: Object.keys(RANK).length + 1 }, () => 0);
    this.#lottoCount = lottoCount;
  }

  writeBoard(rank) {
    if (rank === 0) return;

    this.#board[rank] += 1;
  }

  getBoard() {
    return [...this.#board];
  }

  #getTotalPrize() {
    const totalPrize = this.#board.slice(1).reduce((totalPrize, winCount, index) => {
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
