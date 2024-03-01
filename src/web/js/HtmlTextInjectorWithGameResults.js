import { NUMBER_DELIMITER, WINNING_RULE } from '../../constants';

const HtmlTextInjectorWithGameResults = {
  /**
   *
   * @param {number[][]} lottoTickets
   */
  injectorLottoTickets(lottoTickets) {
    const issuedLottosElement = document.querySelector('.issued-lottos');
    const lottosCountElement = document.querySelector(
      '#purchase-history__lottos-count__number',
    );
    const fragment = document.createDocumentFragment();

    lottosCountElement.textContent = lottoTickets.length;

    lottoTickets.forEach((ticket) => {
      this.private_makeElementForIssuedLotto(ticket, fragment);
    });

    issuedLottosElement.replaceChildren(fragment);
  },
  /**
   * @param {{1:number,2:number,3:number,4:number,5:number}} statisticsResult
   */
  injectStatisticsTable(statisticsResult) {
    const rateStatisticsElement = document.querySelector('.rank-statistics');

    this.private_removePreviousTable();

    rateStatisticsElement.insertAdjacentHTML(
      'afterbegin',
      this.private_getTableHtml(statisticsResult),
    );
  },

  /**
   * @param {number} profitRate
   */
  injectProfitRate(profitRate) {
    const profitRateElement = document.querySelector('#profit-rate');

    profitRateElement.textContent = profitRate;
  },

  /**
   * @param {{1:number,2:number,3:number,4:number,5:number}} statisticsResult
   */
  private_getTableTrArray(statisticsResult) {
    return Array.from(WINNING_RULE)
      .map(
        ([key, value]) => `
      <tr id="rank${key}">
        <th scope="row">${value.matchedCount}개</th>
        <td class="prize">${value.money.toLocaleString('ko-KR')}</td>
        <td class="count">${statisticsResult[key]}</td>
      </tr>`,
      )
      .join('');
  },

  private_removePreviousTable() {
    const targetTableElement = document.querySelector(
      '#rank-statistics__table',
    );

    targetTableElement?.remove();
  },

  /**
   * @param {{1:number,2:number,3:number,4:number,5:number}} statisticsResult
   */
  private_getTableHtml(statisticsResult) {
    return `
    <table id="rank-statistics__table">
    <caption class="screen-reader-only">로또 당첨 결과</caption>
    <thead>
      <tr>
        <th scope="col">일치 갯수</th>
        <th scope="col">당첨금</th>
        <th scope="col">당첨 갯수</th>
      </tr>
    </thead>
    <tbody>
      ${this.private_getTableTrArray(statisticsResult)}
    </tbody>
  </table>
    `;
  },

  /**
   * @param {number[]} ticket
   * @param {DocumentFragment} fragment
   */
  private_makeElementForIssuedLotto(ticket, fragment) {
    const li = document.createElement('li');
    li.className = 'lotto';

    const textAboutLottoNumbers = ticket
      .sort((prev, current) => prev - current)
      .join(NUMBER_DELIMITER);

    // 화면 상에서 숫자들의 영을 맞추지 위해 div로 감싸기
    const otherChildrenOfLi = [...textAboutLottoNumbers]
      .map(
        (string, index) => `
    <div class=${index % 2 ? 'delimiter' : 'number'}>
      ${string}
    </div>
    `,
      )
      .join('');

    const childrenHtml = `<div class="icon-ticket">🎟️</div>${otherChildrenOfLi}`;

    li.insertAdjacentHTML('beforeEnd', childrenHtml);

    fragment.appendChild(li);
  },
};

export default HtmlTextInjectorWithGameResults;
