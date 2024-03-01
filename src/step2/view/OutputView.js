import LOTTO_STATISTICS from '../../step1/constants/lotto-statistics';
import domSelector from '../util/dom';
const {
  generatedLottos,
  afterBuyLottos,
  winningStatistics,
  modal,
  totalProfit,
} = domSelector;

const outputView = {
  printAfterBuyLottos(ticketCount, lottos) {
    this.generatedLottosReset();
    this.printLottoPayment(ticketCount);
    this.printGeneratedLottos(lottos);
    afterBuyLottos.style.visibility = 'visible';
  },

  generatedLottosReset() {
    if (generatedLottos.hasChildNodes()) {
      afterBuyLottos.firstChild.remove();
      this.removeChild(generatedLottos);
    }
  },

  removeChild(parents) {
    while (parents.firstChild) {
      parents.removeChild(parents.firstChild);
    }
  },

  printLottoPayment(count) {
    const ticketCountParagraph = document.createElement('p');
    ticketCountParagraph.innerText = `총 ${count}개를 발행했습니다.`;
    afterBuyLottos.prepend(ticketCountParagraph);
  },

  printGeneratedLottos(lottos) {
    generatedLottos.innerHTML = `
      ${lottos.map((lotto) => `<li>${lotto.join(', ')}</li>`).join('')}`;
  },

  alertModal(lottoStatistics, profit) {
    this.makeWinningStatisticsTable(lottoStatistics);
    totalProfit.innerText = `당신의 총 수익률은 ${profit}%입니다.`;
    modal.style.display = 'block';
  },

  makeWinningStatisticsTable(lottoStatistics) {
    for (const key in LOTTO_STATISTICS) {
      const tr = document.createElement('tr');
      const td1 = document.createElement('td');
      const td2 = document.createElement('td');
      const td3 = document.createElement('td');
      if (LOTTO_STATISTICS[key].number !== 5 || key !== 'fiveBonus') {
        td1.innerText = LOTTO_STATISTICS[key].number + '개';
      } else {
        td1.innerText = '5개 + 보너스볼';
      }

      td2.innerText = LOTTO_STATISTICS[key].price.toLocaleString() + '원';
      td3.innerText = lottoStatistics[key] + '개';
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      winningStatistics.appendChild(tr);
    }
  },

  closeModal() {
    this.resetModal();
    modal.style.display = 'none';
  },

  resetModal() {
    while (winningStatistics.firstChild) {
      winningStatistics.removeChild(winningStatistics.firstChild);
    }
  },
};
export default outputView;
