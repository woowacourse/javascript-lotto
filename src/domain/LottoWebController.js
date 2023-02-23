import lottoGenerator from './LottoGenerator.js';
import Lotto from './Lotto.js';
import LottoValidator from './LottoValidator.js';
import { LOTTO } from '../constants/index.js';
import { selectDom, selectAllDom, createDom } from '../utils/dom.js';

class LottoController {
  #winningNumber = {
    main: [],
    bonus: 0,
  };

  #lottos = [];

  constructor() {
    selectDom('.purchaseForm').addEventListener('submit', this.purchase);
    selectDom('.resultButton').addEventListener('click', this.showResult);
    selectDom('.exitModal').addEventListener('click', this.toggleModal);
    selectDom('.restartButton').addEventListener('click', this.toggleModal);
  }

  purchase = (e) => {
    e.preventDefault();

    const purchaseAmount = selectDom('.inputPurchaseAmount').value;
    const lottos = this.issue(purchaseAmount);

    selectDom('.lottoIssueView').style.visibility = 'visible';
    selectDom('.lottoResultView').style.visibility = 'visible';

    const lottoIssueViewTitle = selectDom('.lottoIssueViewTitle');
    lottoIssueViewTitle.innerText = `총 ${lottos.length}개를 구매하였습니다.`;

    const ticketView = selectDom('.ticketView');
    ticketView.innerHTML = '';
    lottos.forEach((lotto) => {
      const ticket = createDom('div');
      ticket.className = 'ticket';

      const ticketPicture = createDom('div');
      ticketPicture.className = 'ticketPicture';
      ticketPicture.innerText = '🎟️';

      const ticketNumber = createDom('div');
      ticketNumber.innerText = lotto.getNumbers().join(', ');

      ticket.appendChild(ticketPicture);
      ticket.appendChild(ticketNumber);

      ticketView.appendChild(ticket);
    });
  };

  showResult = () => {
    const winningNumber = [...selectAllDom('.number')].map((number) => number.value);
    this.setWinningNumber(winningNumber);

    const result = this.getResult();
    selectAllDom('.winningCount').forEach((countBox, index) => {
      countBox.innerText = `${result.matchResult[4 - index]}개`;
    });

    const resultExplain = selectDom('.resultExplain');
    resultExplain.innerText = `당신의 총 수익률은 ${result.benefit}%입니다.`;

    this.toggleModal();
  };

  issue(money) {
    LottoValidator.checkMoney(money);
    this.#lottos.unshift(...Array.from({ length: money / LOTTO.price }, () => new Lotto(lottoGenerator())));

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

  toggleModal = () => {
    if (selectDom('.modal').style.display === 'none') {
      selectDom('.modal').style.display = 'flex';
      selectDom('.modalBackground').style.display = 'flex';
    } else {
      selectDom('.modal').style.display = 'none';
      selectDom('.modalBackground').style.display = 'none';
    }
  };
}

export default LottoController;
