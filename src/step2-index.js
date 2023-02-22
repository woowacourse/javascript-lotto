/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */
import './css/style.css';
import LottoController from './domain/LottoController.js';

const lottoController = new LottoController();
const purchaseForm = document.querySelector('.purchaseForm');

purchaseForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const purchaseAmount = document.querySelector('.inputPurchaseAmount').value;
  const lottos = lottoController.purchase(purchaseAmount);

  const ticketView = document.querySelector('.ticketView');
  lottos.forEach((lotto) => {
    const ticket = document.createElement('div');
    ticket.className = 'ticket';

    const ticketPicture = document.createElement('div');
    ticketPicture.className = 'ticketPicture';
    ticketPicture.innerText = '🎟️';

    const ticketNumber = document.createElement('div');
    ticketNumber.innerText = lotto.getNumbers().join(', ');

    ticket.appendChild(ticketPicture);
    ticket.appendChild(ticketNumber);

    ticketView.appendChild(ticket);
  });
});

const resultButton = document.querySelector('.resultButton');

resultButton.addEventListener('click', () => {
  const winningNumber = [...document.querySelectorAll('.number')].map((number) => number.value);
  lottoController.setWinningNumber(winningNumber);
  const result = lottoController.getResult();
  console.log(result);

  document.querySelector('.modal').style.display = 'flex';
  document.querySelector('.modalBackground').style.display = 'flex';
});

const modalButton = document.querySelector('.exitModal');
modalButton.addEventListener('click', () => {
  document.querySelector('.modal').style.display = 'none';
  document.querySelector('.modalBackground').style.display = 'none';
});

const restartButton = document.querySelector('.restartButton');
restartButton.addEventListener('click', () => {
  document.querySelector('.modal').style.display = 'none';
  document.querySelector('.modalBackground').style.display = 'none';
});
