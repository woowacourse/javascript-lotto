import Table from './Table.js';
import ModalWindow from './ModalWindow.js';

const makeResultTable = (rankingBoard) => {
  const table = Table.create();

  Table.addHead(table, ['일치 개수', '당첨금', '당첨 개수']);
  Table.addRow(table, ['3개', '5,000', `${rankingBoard.fifth}`]);
  Table.addRow(table, ['4개', '50,000', `${rankingBoard.fourth}`]);
  Table.addRow(table, ['5개', '1,500,000', `${rankingBoard.third}`]);
  Table.addRow(table, ['5개+보너스볼', '30,000,000', `${rankingBoard.second}`]);
  Table.addRow(table, ['6개', '2,000,000,000', `${rankingBoard.first}`]);

  return table;
};

const closeModalWindowByEscCallback = (event) => {
  if (event.key === 'Escape' || event.key === 'Esc') {
    ModalWindow.hide();
    window.removeEventListener('keydown', closeModalWindowByEscCallback);
  }
};

const HTMLOutputView = {
  showHiddenFeatures() {
    document.querySelectorAll('.hidden-first')
      .forEach((element) => { element.style.display = 'flex'; });
  },

  showLottoList(lottoList) {
    document.querySelector('.lotto-count').textContent = `총 ${lottoList.length}개를 구매했습니다.`;
    document.querySelector('.lotto-list .list').innerHTML = lottoList
      .map((lottoNumbers) => `<p class="lotto">🎟️ ${lottoNumbers.join(', ')}</p>`)
      .join('');
  },

  showResult(rankingBoard, earningRate) {
    const resultHeader = document.createElement('h1');
    const table = makeResultTable(rankingBoard);
    const resultFooter = document.createElement('h3');

    const headerText = document.createTextNode('🏆 당첨 통계 🏆');
    const footerText = document.createTextNode(`당신의 총 수익률은 ${earningRate.toFixed(2)}% 입니다.`);

    resultHeader.appendChild(headerText);
    resultFooter.appendChild(footerText);

    ModalWindow.show();
    ModalWindow.addDomTree(resultHeader);
    ModalWindow.addDomTree(table);
    ModalWindow.addDomTree(resultFooter);

    window.addEventListener('keydown', closeModalWindowByEscCallback);
  },
};

export default HTMLOutputView;
