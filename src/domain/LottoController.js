import Lotto from './Lotto.js';
import lottoGenerator from './LottoGenerator.js';
import { LOTTO } from '../constants/index.js';
import LottoValidator from './LottoValidator.js';

class LottoController {
  #winningNumber = {
    main: [],
    bonus: 0,
  };

  #lottos = [];

  purchase(money) {
    LottoValidator.checkMoney(money);
    this.#lottos = Array.from({ length: money / LOTTO.price }, () => new Lotto(lottoGenerator()));

    return this.#lottos;
  }

  setWinningNumber(winningNumber) {
    winningNumber.forEach((number, index) => {
      if (index !== 6) this.#winningNumber.main.push(number);
      else this.#winningNumber.bonus = number;
    });
  }

  getResult() {
    const matchResult = this.#judgeResult();
    const benefit = this.#calculateBenefit(matchResult);
    return { matchResult, benefit };
  }

  #calculateBenefit(ranks) {
    const totalPrice = ranks.reduce((accumulator, rank, index) => {
      accumulator += rank * LOTTO.prize[index];
      return accumulator;
    }, 0);
    return (totalPrice / (this.#lottos.length * LOTTO.price)) * 100;
  }

  #judgeResult() {
    const rankingCount = Array(LOTTO.prize.length).fill(0);
    return this.#lottos.reduce((acc, lotto) => {
      const ranking = lotto.calculateRanking(this.#winningNumber);
      acc[ranking - 1] += 1;
      return acc;
    }, rankingCount);
  }
}

export default LottoController;
