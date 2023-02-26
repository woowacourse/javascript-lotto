import {
  CONSOLE_MESSAGE,
  CORRECT_COUNT_PER_RANK,
  PROFIT,
  INDEX_TO_KEY_CONVERTER,
  PROFIT_PER_RANK,
  REGEX,
} from '../constants/constants';

import {
  MODAL_TABLE_HEADER,
  MODAL_RESTART_BUTTON,
  MODAL_TITLE,
  MODAL_CLOSE_BUTTON,
} from './components/StatisticsModal';

const GameResultView = {
  render(ranks, profitRate) {
    const lottoGameContainer = document.getElementById('lotto-game');
    const gameResultDialog = document.createElement('dialog');
    gameResultDialog.setAttribute('id', 'modal-dialog');

    gameResultDialog.appendChild(MODAL_TITLE);
    gameResultDialog.appendChild(MODAL_CLOSE_BUTTON);

    const statisticsTable = this.renderTable(ranks);
    gameResultDialog.appendChild(statisticsTable);

    const profitRateSpan = this.renderProfitRate(profitRate);

    gameResultDialog.appendChild(profitRateSpan);
    gameResultDialog.appendChild(MODAL_RESTART_BUTTON);

    lottoGameContainer.appendChild(gameResultDialog);
  },

  renderTable(ranks) {
    const modalTable = document.createElement('table');
    modalTable.setAttribute('id', 'modal-table');
    modalTable.innerHTML = MODAL_TABLE_HEADER;
    const modalTableBody = document.createElement('tbody');

    ranks.forEach((lottoCount, index, origin) => {
      const tableRow = document.createElement('tr');
      const corretCountData = document.createElement('td');
      const profitData = document.createElement('td');
      const winningCountData = document.createElement('td');
      const rank = PROFIT_PER_RANK.length - index;
      const correctCount = origin[PROFIT_PER_RANK.length - index - 1];

      corretCountData.innerText = `${
        CORRECT_COUNT_PER_RANK[INDEX_TO_KEY_CONVERTER[rank - 1]]
      }개 일치${rank === 2 ? ',+보너스 볼' : ''}`;
      tableRow.appendChild(corretCountData);

      profitData.innerText = `${PROFIT[INDEX_TO_KEY_CONVERTER[rank - 1]]
        .toString()
        .replace(REGEX.PRICE_FORMAT, ',')}원`;
      tableRow.appendChild(profitData);

      winningCountData.innerText = `${correctCount}개`;
      tableRow.appendChild(winningCountData);

      modalTableBody.appendChild(tableRow);
    });
    modalTable.appendChild(modalTableBody);

    return modalTable;
  },

  renderProfitRate(profitRate) {
    const span = document.createElement('span');
    span.setAttribute('id', 'modal-profit');
    span.innerText = CONSOLE_MESSAGE.showProfitRate(profitRate);
    console.log(profitRate);

    return span;
  },

  addRestartClickEvent(clickHandler) {
    const button = document.getElementById('modal-restart-btn');
    button.addEventListener('click', (e) => {
      e.preventDefault();
      clickHandler();
    });
  },

  addCloseClickEvent(clickHandler) {
    const button = document.getElementById('modal-close-btn');
    button.addEventListener('click', (e) => {
      e.preventDefault();
      clickHandler();
    });
  },

  close() {
    const lottoGameContainer = document.getElementById('lotto-game');
    const gameResultDialog = document.getElementById('modal-dialog');
    lottoGameContainer.removeChild(gameResultDialog);
  },
};

export default GameResultView;
