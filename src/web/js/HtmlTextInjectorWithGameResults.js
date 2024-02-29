import { NUMBER_DELIMITER } from '../../constants';

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

    lottosCountElement.textContent = lottoTickets.length;

    lottoTickets.forEach((ticket) => {
      this.private_makeElementForIssuedLotto(ticket, issuedLottosElement);
    });
  },

  /**
   * @param {{1:number,2:number,3:number,4:number,5:number}} statisticsResult
   */
  injectLottoStatistics(statisticsResult) {
    Object.entries(statisticsResult).forEach(([key, value]) => {
      const countElement = document.querySelector(`#rank${key} .count`);

      countElement.textContent = value;
    });
  },
  /**
   * @param {number} profitRate
   */
  injectProfitRate(profitRate) {
    const profitRateElement = document.querySelector('#profit-rate');

    profitRateElement.textContent = profitRate;
  },
  /**
   *
   * @param {{text:string,className:className=undefined}} elementInfo
   * @param {Element} parentElement
   */
  private_makeElementForIssuedLottoNumber(elementInfo, parentElement) {
    const { text, className } = elementInfo;

    const div = document.createElement('div');
    div.textContent = text;
    if (className) div.className = className;

    parentElement.appendChild(div);
  },

  /**
   * @param {number[]} ticket
   * @param {Element} issuedLottosElement
   */
  private_makeElementForIssuedLotto(ticket, issuedLottosElement) {
    const li = document.createElement('li');
    const textAboutLottoNumbers = ticket
      .sort((prev, current) => prev - current)
      .join(`${NUMBER_DELIMITER} `);

    li.className = 'lotto';

    issuedLottosElement.appendChild(li);

    this.private_makeElementForIssuedLottoNumber(
      { text: '🎟️', className: 'icon-ticket' },
      li,
    );
    const numbers = textAboutLottoNumbers.split(NUMBER_DELIMITER);

    numbers.forEach((number, index) => {
      this.private_makeElementForIssuedLottoNumber(
        { text: number, className: 'number' },
        li,
      );
      if (index < numbers.length - 1) {
        this.private_makeElementForIssuedLottoNumber(
          { text: NUMBER_DELIMITER, className: 'delimiter' },
          li,
        );
      }
    });
  },
};

export default HtmlTextInjectorWithGameResults;
