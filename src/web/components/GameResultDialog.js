export default class GameResultDialog {
  #onRestart;
  #elements;

  constructor({ onRestart }) {
    this.#onRestart = onRestart;
  }

  mount(container) {
    const { dialog, tbody, profitRate, closeBtn, restartBtn } = this.#createElement();
    this.#elements = { dialog, tbody, profitRate };
    closeBtn.addEventListener('click', () => dialog.close());
    restartBtn.addEventListener('click', () => {
      dialog.close();
      this.#onRestart();
    });
    container.appendChild(dialog);
  }

  unmount() {
    this.#elements.dialog.remove();
  }

  open(prizeList, profitRate) {
    this.#renderTable(prizeList);
    this.#elements.profitRate.textContent = `당신의 총 수익률은 ${profitRate}%입니다.`;
    this.#elements.dialog.showModal();
  }

  #renderTable(prizeList) {
    const { tbody } = this.#elements;
    const fragment = document.createDocumentFragment();
    prizeList.forEach(({ matchCount, hasBonus, prize, count }) => {
      const row = document.createElement('tr');

      const matchCell = document.createElement('td');
      matchCell.textContent = hasBonus ? `${matchCount}개+보너스볼` : `${matchCount}개`;

      const prizeCell = document.createElement('td');
      prizeCell.textContent = prize.toLocaleString();

      const countCell = document.createElement('td');
      countCell.textContent = `${count}개`;

      row.append(matchCell, prizeCell, countCell);
      fragment.appendChild(row);
    });
    tbody.replaceChildren(fragment);
  }

  #createTable() {
    const table = document.createElement('table');
    table.className = 'result-table';

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    ['일치 갯수', '당첨금', '당첨 갯수'].forEach((text) => {
      const th = document.createElement('th');
      th.textContent = text;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    const tbody = document.createElement('tbody');
    table.append(thead, tbody);
    return { table, tbody };
  }

  #createElement() {
    const dialog = document.createElement('dialog');
    dialog.className = 'lotto-result-dialog';

    const inner = document.createElement('div');
    inner.className = 'lotto-result-dialog__inner';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'lotto-result-dialog__close';
    closeBtn.textContent = '✕';

    const title = document.createElement('h2');
    title.className = 'lotto-result-dialog__title';
    title.textContent = '🏆 당첨 통계 🏆';

    const { table, tbody } = this.#createTable();

    const profitRate = document.createElement('p');
    profitRate.className = 'lotto-result-dialog__profit-rate';

    const restartBtn = document.createElement('button');
    restartBtn.className = 'restart-btn caption';
    restartBtn.textContent = '다시 시작하기';

    inner.append(closeBtn, title, table, profitRate, restartBtn);
    dialog.appendChild(inner);
    return { dialog, tbody, profitRate, closeBtn, restartBtn };
  }
}
