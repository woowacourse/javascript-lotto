import lottoGenerator from './LottoGenerator.js';
import Lotto from './Lotto.js';
import LottoValidator from './LottoValidator.js';
import { LOTTO } from '../constants/index.js';
import { selectDom } from '../utils/dom.js';
import View from '../view/View.js';

class LottoWebController {
  #winningNumber = {
    main: [],
    bonus: 0,
  };

  #lottos = [];

  constructor() {
    selectDom('.purchaseForm').addEventListener('submit', this.#purchase);
    selectDom('.resultButton').addEventListener('click', this.#showResult);
    selectDom('.exitModal').addEventListener('click', this.#exit);
    selectDom('.restartButton').addEventListener('click', this.#restart);
  }

  #purchase = (e) => {
    e.preventDefault();

    const money = View.inputMoney();
    if (this.#isError(LottoValidator.checkMoney, money)) return;

    this.#lottos.unshift(...Array.from({ length: money / LOTTO.price }, () => new Lotto(lottoGenerator())));

    View.ticketView(this.#lottos);
  };

  #showResult = () => {
    this.#winningNumber = View.inputWinningNumber();
    if (this.#isError(LottoValidator.checkWinningNumberWithBonus, this.#winningNumber)) return;

    const matchResult = this.#calculateMatching();
    const benefit = this.#calculateBenefit(matchResult);
    return View.resultView(matchResult, benefit);
  };

  #restart = () => {
    this.#winningNumber = { main: [], bonus: 0 };
    this.#lottos = [];
    return View.clearView();
  };

  #exit = () => {
    return View.closeModal();
  };

  #calculateMatching() {
    const rankingCount = Array(LOTTO.prize.length).fill(0);
    return this.#lottos.reduce((acc, lotto) => {
      const ranking = lotto.calculateRanking(this.#winningNumber);
      acc[ranking - 1] += 1;
      return acc;
    }, rankingCount);
  }

  #calculateBenefit(ranks) {
    const totalPrice = ranks.reduce((accumulator, rank, index) => {
      accumulator += rank * LOTTO.prize[index];
      return accumulator;
    }, 0);
    return (totalPrice / (this.#lottos.length * LOTTO.price)) * 100;
  }

  #isError(validator, value) {
    try {
      validator(value);
      return false;
    } catch (e) {
      View.showAlert(e.message);
      return true;
    }
  }
}

export default LottoWebController;
