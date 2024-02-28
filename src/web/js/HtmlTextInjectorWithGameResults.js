import { NUMBER_DELIMITER } from '../../constants';

const HtmlTextInjectorWithGameResults = {
  injectorLottoTickets(lottoTickets) {
    const issuedLottosEl = document.querySelector('.issuedLottos');
    const lottosCountEl = document.querySelector(
      '#purchasedHistory__lottos-count__number',
    );

    lottosCountEl.textContent = lottoTickets.length;

    lottoTickets.forEach((ticket) => {
      this.private_makeElementForIssuedLotto(ticket, issuedLottosEl);
    });
  },

  injectLottoStatistics(statisticsResult) {
    Object.entries(statisticsResult).forEach(([key, value]) => {
      const countEl = document.querySelector(`#rank${key} .count`);

      countEl.textContent = value;
    });
  },

  injectProfitRate(profitRate) {
    const profitRateEl = document.querySelector('#profitRate');
    profitRateEl.textContent = profitRate;
  },

  private_makeElementForIssuedLotto(ticket, issuedLottosEl) {
    const li = document.createElement('li');
    const textAboutLottoNumbers = ticket
      .sort((prev, current) => prev - current)
      .join(`${NUMBER_DELIMITER} `);

    li.className = 'lotto';
    li.textContent = `🎟️ ${textAboutLottoNumbers}`;

    issuedLottosEl.appendChild(li);
  },
};

export default HtmlTextInjectorWithGameResults;
