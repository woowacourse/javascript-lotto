export const STATISTICS_EVENTS = {
  restart: 'restartGame',
};

export const STATISTICS_SELECTOR = 'statistics-result';

export default class Statistics extends HTMLElement {
  #table;

  #profitRate;

  #restartBtn;

  constructor() {
    super();

    const template = document.querySelector('#template-statistics');
    const content = template.content.cloneNode(true);
    this.appendChild(content);

    this.#table = this.querySelector('#statistics-table');
    this.#profitRate = this.querySelector('#profit-rate');
    this.#restartBtn = this.querySelector('#restart');
  }

  static get observedAttributes() {
    return ['data-lotto-analytics'];
  }

  get lottoAnalytics() {
    if (!this.dataset.lottoAnalytics) {
      return {};
    }
    return JSON.parse(this.dataset.lottoAnalytics);
  }

  set lottoAnalytics(value) {
    this.setAttribute('data-lotto-analytics', JSON.stringify(value));
  }

  connectedCallback() {
    this.#restartBtn.addEventListener('click', this.#dispatchRestartEvent.bind(this));
  }

  attributeChangedCallback() {
    this.#updateTable();
    this.#updateProfitRate();
  }

  clear() {
    this.lottoAnalytics = {};
  }

  #updateTable() {
    const numOfMatchedCnts = this.#table.querySelectorAll('.numberOfMatchedCount');

    numOfMatchedCnts.forEach((element) => {
      const { id } = element;
      const { statisticsResult } = this.lottoAnalytics;

      element.innerHTML = statisticsResult ? `${statisticsResult[id]}개` : '';
    });
  }

  #updateProfitRate() {
    const { profitRate } = this.lottoAnalytics;

    this.#profitRate.innerHTML = `당신의 총 수익률은 ${profitRate}%입니다.`;
  }

  #dispatchRestartEvent() {
    this.dispatchEvent(new CustomEvent(STATISTICS_EVENTS.restart));
  }
}
