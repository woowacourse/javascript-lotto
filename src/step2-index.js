/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */
import './css/style.css';
import { selectDom, selectAllDom, createDom } from './utils/dom.js';
import LottoWebController from './domain/LottoWebController.js';

const lottoController = new LottoWebController();
const purchaseForm = selectDom('.purchaseForm');

purchaseForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const purchaseAmount = selectDom('.inputPurchaseAmount').value;
  const lottos = lottoController.purchase(purchaseAmount);

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
});

const resultButton = selectDom('.resultButton');

resultButton.addEventListener('click', () => {
  const winningNumber = [...selectAllDom('.number')].map((number) => number.value);
  lottoController.setWinningNumber(winningNumber);

  const result = lottoController.getResult();
  selectAllDom('.winningCount').forEach((countBox, index) => {
    countBox.innerText = `${result.matchResult[4 - index]}개`;
  });

  const resultExplain = selectDom('.resultExplain');
  resultExplain.innerText = `당신의 총 수익률은 ${result.benefit}%입니다.`;

  selectDom('.modal').style.display = 'flex';
  selectDom('.modalBackground').style.display = 'flex';
});

const modalButton = selectDom('.exitModal');
modalButton.addEventListener('click', () => {
  selectDom('.modal').style.display = 'none';
  selectDom('.modalBackground').style.display = 'none';
});

const restartButton = selectDom('.restartButton');
restartButton.addEventListener('click', () => {
  selectDom('.modal').style.display = 'none';
  selectDom('.modalBackground').style.display = 'none';
});
