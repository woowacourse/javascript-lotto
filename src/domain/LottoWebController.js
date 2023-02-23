import lottoGenerator from './LottoGenerator.js';
import Lotto from './Lotto.js';
import LottoValidator from './LottoValidator.js';
import { LOTTO } from '../constants/index.js';
import { selectDom, selectAllDom, createDom } from '../utils/dom.js';

class LottoWebController {
  #winningNumber = {
    main: [],
    bonus: 0,
  };

  #lottos = [];

  constructor() {
    selectDom('.purchaseForm').addEventListener('submit', this.#purchase);
    selectDom('.resultButton').addEventListener('click', this.#showResult);
    selectDom('.exitModal').addEventListener('click', () => selectDom('.modal').close());
    selectDom('.restartButton').addEventListener('click', this.#restart);
  }

  #purchase = (e) => {
    e.preventDefault();

    const money = selectDom('.inputPurchaseAmount').value;
    if (this.#isError(LottoValidator.checkMoney, money)) return;

    this.#lottos.unshift(...Array.from({ length: money / LOTTO.price }, () => new Lotto(lottoGenerator())));
    const ticketView = selectDom('.ticketView');
    ticketView.innerHTML = '';
    selectDom('.lottoIssueViewTitle').innerText = `총 ${this.#lottos.length}개를 구매하였습니다.`;
    this.#lottos.forEach((lotto) => ticketView.appendChild(this.#createTicket(lotto)));

    return this.#toggleLottoIssue('visible');
  };

  #showResult = () => {
    this.#winningNumber = [...selectAllDom('.number')].reduce(
      (acc, number, index) => {
        const lottoNumber = number.value;
        if (index !== 6) acc.main.push(lottoNumber);
        else acc.bonus = lottoNumber;
        return acc;
      },
      { main: [], bonus: 0 }
    );
    if (this.#isError(LottoValidator.checkWinningNumberWithBonus, this.#winningNumber)) return;

    const matchResult = this.#calculateMatching();
    const benefit = this.#calculateBenefit(matchResult);
    selectAllDom('.winningCount').forEach((count, index) => (count.innerText = `${matchResult[4 - index]}개`));
    selectDom('.resultExplain').innerText = `당신의 총 수익률은 ${benefit}%입니다.`;

    return selectDom('.modal').showModal();
  };

  #restart = () => {
    this.#winningNumber = { main: [], bonus: 0 };
    this.#lottos = [];
    selectDom('.modal').close();
    selectDom('.lottoIssueViewTitle').innerText = '';
    selectAllDom('input').forEach((input) => (input.value = ''));
    this.#toggleLottoIssue('hidden');
  };

  #createTicket(lotto) {
    const ticket = createDom('div');
    ticket.className = 'ticket';

    const ticketPicture = createDom('div');
    ticketPicture.className = 'ticketPicture';
    ticketPicture.innerText = '🎟️';

    const ticketNumber = createDom('div');
    ticketNumber.innerText = lotto.getNumbers().join(', ');

    ticket.appendChild(ticketPicture);
    ticket.appendChild(ticketNumber);

    return ticket;
  }

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

  #toggleLottoIssue(state) {
    selectDom('.lottoIssueView').style.visibility = state;
    selectDom('.lottoResultView').style.visibility = state;
  }

  #isError(validator, value) {
    try {
      validator(value);
      return false;
    } catch (e) {
      window.alert(e.message);
      return true;
    }
  }
}

export default LottoWebController;
