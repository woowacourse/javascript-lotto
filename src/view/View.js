import { createDom, selectAllDom, selectDom } from '../utils/dom';

const View = {
  inputMoney() {
    return selectDom('.inputPurchaseAmount').value;
  },
  inputWinningNumber() {
    return [...selectAllDom('.number')].reduce(
      (acc, number, index) => {
        const lottoNumber = number.value;
        if (index !== 6) acc.main.push(lottoNumber);
        else acc.bonus = lottoNumber;
        return acc;
      },
      { main: [], bonus: 0 }
    );
  },
  ticketView(lottos) {
    const ticketView = selectDom('.ticketView');
    ticketView.innerHTML = '';
    selectDom('.lottoIssueViewTitle').innerText = `총 ${lottos.length}개를 구매하였습니다.`;
    lottos.forEach((lotto) => ticketView.appendChild(View.createTicket(lotto)));
    selectDom('.lottoIssueView').style.visibility = 'visible';
    selectDom('.lottoResultView').style.visibility = 'visible';
  },
  createTicket(lotto) {
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
  },
  resultView(matchResult, benefit) {
    selectAllDom('.winningCount').forEach((count, index) => (count.innerText = `${matchResult[4 - index]}개`));
    selectDom('.resultExplain').innerText = `당신의 총 수익률은 ${benefit.toFixed(3)}%입니다.`;
    View.showModal();
  },
  clearView() {
    selectDom('.modal').close();
    selectDom('.lottoIssueViewTitle').innerText = '';
    selectAllDom('input').forEach((input) => (input.value = ''));
    selectDom('.lottoIssueView').style.visibility = 'hidden';
    selectDom('.lottoResultView').style.visibility = 'hidden';
  },
  showModal() {
    selectDom('.modal').showModal();
  },
  closeModal() {
    selectDom('.modal').close();
  },
  showAlert(message) {
    window.alert(message);
  },
};

export default View;
