import LOTTO_STATISTICS from '../../step1/constants/lotto-statistics';
import domSelector from './domSelector';
const {
  generatedLottos,
  afterBuyLottos,
  winningStatistics,
  modal,
  totalProfit,
} = domSelector;

const outputView = {
  showAfterBuyLottos(ticketCount, lottos) {
    this.resetGeneratedLottos();
    this.printLottoPayment(ticketCount);
    this.printGeneratedLottos(lottos);
    afterBuyLottos.style.visibility = 'visible';
  },

  resetGeneratedLottos() {
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
    modal.style.display = 'flex';
  },

  makeWinningStatisticsTable(lottoStatistics) {
    for (const key in LOTTO_STATISTICS) {
      const tr = this.createTableElement(3);
      tr.firstChild.innerText = this.getMatchCountDescriptio(key);
      tr.children[1].innerText =
        LOTTO_STATISTICS[key].price.toLocaleString() + '원';
      tr.lastChild.innerText = lottoStatistics[key] + '개';
      winningStatistics.appendChild(tr);
    }
  },

  getMatchCountDescriptio(key) {
    if (LOTTO_STATISTICS[key].number !== 5 || key !== 'fiveBonus') {
      return LOTTO_STATISTICS[key].number + '개';
    } else {
      return '5개 + 보너스볼';
    }
  },

  createTableElement(tableDataCount) {
    const tr = document.createElement('tr');
    while (tableDataCount--) {
      const td = document.createElement('td');
      tr.appendChild(td);
    }
    return tr;
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
