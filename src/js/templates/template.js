import { LOTTO } from '../configs/contants.js';

const template = {
  app: () => {
    return `
      <h1 id="title">🎱 행운의 로또</h1>
      <section id="payment-section">
      </section>
      <section id="ticket-section">
      </section>
      <section id="winning-number-section">
      </section>
      <div id="statistic-section-wrap" class="blind">
      </div>
    `;
  },
  paymentSection: () => {
    return `
      <label for="payment-input">구입할 금액을 입력해주세요.</label>
      <form id="payment-form">
        <input type="number" id="payment-input" />
        <button id="payment-submit">구입</button>
      </form>
    `;
  },
  ticketSection: () => {
    return `
      <div id="ticket-list-wrap">
      </div>
      <div id="show-number-toggle-area">
      </div>
    `;
  },
  ticketListWrap: (lottoList, isShowNumber) => {
    return `
      <p>총 <span>${lottoList.length}</span>개를 구매하였습니다.</p>
      <ul id="ticket-list" class="${
        isShowNumber ? 'ticket-list-column' : 'ticket-list-row'
      }">
        ${lottoList
          .map(
            (lotto) =>
              `<li class="ticket">
              <p>
              <span class="ticket-emoji">🎟</span>
              ${
                isShowNumber
                  ? `<span class="ticket-numbers">${lotto.numbers.join(
                      ', '
                    )}</span>`
                  : ''
              }
              </p>
              </li>`
          )
          .join('')}
      </ul>
    `;
  },
  showNumberToggleArea: (isShowNumber) => {
    return `
      <label class="switch-label">
      번호 보기
        <label class="switch">
          <input id="slider" type="checkbox" ${isShowNumber ? 'checked' : ''}/>
          <span class="slider round"></span>
        </label>
      </label>
    `;
  },
  winningNumberSection: () => {
    return `
      <p>지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</p>
      <form id="winning-number-form">
        <fieldset id="winning-number-fieldset">
          <legend hidden>당첨번호 입력란</legend>
          <label id="winning-number-input-label">
            당첨 번호
            <ul id="winning-number-input-wrap">
              ${`<li><input class="winning-number-input" type="text" maxlength="2" /></li>`.repeat(
                LOTTO.NUMBER_LENGTH
              )}
            </ul>
          </label>
          <label id="bonus-number-input-label" for="bonus-number-input">
            보너스 번호
            <input id="bonus-number-input" type="text" maxlength="2" />
          </label>
        </fieldset>
        <button id="show-result-button">결과 확인하기</button>
      </form>
      <button id="winning-number-section-reset-button" class="blind">다시 시작하기</button>
    `;
  },
  statisticSectionWrap: (winningStatistic, earningRatio) => {
    return `
      <section id="statistic-section">
        <h2>🏆 당첨 통계 🏆</h2>
        <span id="close-button"></span>
        <table id="statistic-table">
          <tr>
            <th>일치 갯수</th>
            <th>당첨금</th>
            <th>당첨 갯수</th>
          </tr>
          <tr>
            <td>3개</td>
            <td>5,000</td>
            <td>${winningStatistic.three}개</td>
          </tr>
          <tr>
            <td>4개</td>
            <td>50,000</td>
            <td>${winningStatistic.four}개</td>
          </tr>
          <tr>
            <td>5개</td>
            <td>1,500,000</td>
            <td>${winningStatistic.five}개</td>
          </tr>
          <tr>
            <td>5개+보너스볼</td>
            <td>30,000,000</td>
            <td>${winningStatistic.fiveBonus}개</td>
          </tr>
          <tr>
            <td>6개</td>
            <td>2,000,000,000</td>
            <td>${winningStatistic.six}개</td>
          </tr>
        </table>
        <p id="ratio-result">당신의 총 수익률은 ${earningRatio}%입니다.</p>
        <button id="statistic-section-reset-button">다시 시작하기</button>
      </section>
    `;
  },
};

export default template;
