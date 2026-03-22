import { createEl } from '../utils/dom.js';

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
    const fragment = document.createDocumentFragment();
    prizeList.forEach(({ matchCount, hasBonus, prize, count }) => {
      fragment.appendChild(
        createEl('tr', {},
          createEl('td', {}, hasBonus ? `${matchCount}개+보너스볼` : `${matchCount}개`),
          createEl('td', {}, prize.toLocaleString()),
          createEl('td', {}, `${count}개`),
        ),
      );
    });
    this.#elements.tbody.replaceChildren(fragment);
  }

  #createTable() {
    const tbody = createEl('tbody');
    const table = createEl('table', { className: 'result-table' },
      createEl('thead', {},
        createEl('tr', {},
          ...['일치 갯수', '당첨금', '당첨 갯수'].map((text) => createEl('th', {}, text)),
        ),
      ),
      tbody,
    );
    return { table, tbody };
  }

  #createElement() {
    const { table, tbody } = this.#createTable();
    const closeBtn = createEl('button', { className: 'lotto-result-dialog__close' }, '✕');
    const profitRate = createEl('p', { className: 'lotto-result-dialog__profit-rate' });
    const restartBtn = createEl('button', { className: 'restart-btn caption' }, '다시 시작하기');
    const dialog = createEl('dialog', { className: 'lotto-result-dialog' },
      createEl('div', { className: 'lotto-result-dialog__inner' },
        closeBtn,
        createEl('h2', { className: 'lotto-result-dialog__title' }, '🏆 당첨 통계 🏆'),
        table,
        profitRate,
        restartBtn,
      ),
    );
    return { dialog, tbody, profitRate, closeBtn, restartBtn };
  }
}
