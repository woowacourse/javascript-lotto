import { DOM_STRING, LOTTO } from '../configs/contants.js';

const template = {
  app: () => {
    return `
      <h1 id="${DOM_STRING.TITLE}">🎱 행운의 로또</h1>
      <section id="${DOM_STRING.PAYMENT_SECTION}">
      </section>
      <section id="${DOM_STRING.TICKET_SECTION}">
      </section>
      <section id="${DOM_STRING.WINNING_NUMBER_SECTION}">
      </section>
      <div id="statistic-section-wrap" class="blind">
      </div>
    `;
  },
  paymentSection: () => {
    return `
      <h2 hidden>${DOM_STRING.PAYMENT_SECTION}</h2>
      <label for="${DOM_STRING.PAYMENT_INPUT}">구입할 금액을 입력해주세요.</label>
      <form>
        <input type="number" id="${DOM_STRING.PAYMENT_INPUT}" name="${DOM_STRING.PAYMENT_INPUT}" />
        <button id="${DOM_STRING.PAYMENT_SUBMIT}">구입</button>
      </form>
    `;
  },
  ticketSection: () => {
    return `
      <h2 class="${DOM_STRING.BLIND}">${DOM_STRING.TICKET_SECTION}</h2>
      <div id="${DOM_STRING.TICKET_LIST_WRAP}">
      </div>
      <div id="${DOM_STRING.SHOW_NUMBER_TOGGLE_AREA}">
      </div>
    `;
  },
  ticketListWrap: (lottoList, isShowNumber) => {
    return `
      <p>총 <span>${lottoList.length}</span>개를 구매하였습니다.</p>
      <ul id="${DOM_STRING.TICKET_LIST}" class="${
      isShowNumber ? DOM_STRING.TICKET_LIST_COLUMN : DOM_STRING.TICKET_LIST_ROW
    }">
        ${lottoList
          .map(
            (lotto) =>
              `<li class="${DOM_STRING.TICKET}">
              <p>
              <span class="${DOM_STRING.TICKET_EMOJI}">🎟</span>
              ${
                isShowNumber
                  ? `<span class="${DOM_STRING.TICKET_NUMBERS}">
                  ${lotto.numbers.join(', ')}</span>`
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
      <label class="${DOM_STRING.SWITCH_LABEL}">
      번호 보기
        <label class="${DOM_STRING.SWITCH}">
          <input id="${DOM_STRING.SLIDER}" type="checkbox" ${
      isShowNumber ? 'checked' : ''
    }/>
          <span class="${DOM_STRING.SLIDER} round"></span>
        </label>
      </label>
    `;
  },
  winningNumberSection: () => {
    return `
      <h2 class="${DOM_STRING.BLIND}">${DOM_STRING.WINNING_NUMBER_SECTION}</h2>
      <p>지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</p>
      <fieldset id="${DOM_STRING.WINNING_NUMBER_FIELDSET}">
        <form id="${DOM_STRING.WINNING_NUMBER_FORM}">
          <label>당첨 번호</label>
          <div id="${DOM_STRING.WINNING_NUMBER_INPUT_WRAP}">
            ${`<input class="${DOM_STRING.WINNING_NUMBER_INPUT}" type="text" maxlength="2" />`.repeat(
              LOTTO.NUMBER_LENGTH
            )}
          </div>
        </form>
        <form id="${DOM_STRING.BONUS_NUMBER_FORM}">
          <label for="bonus_number">보너스 번호</label>
          <input class="${
            DOM_STRING.BONUS_NUMBER_INPUT
          }" type="text" name="bonus_number" maxlength="2" />
        </form>
      </fieldset>
      <button id="${DOM_STRING.SHOW_RESULT_BUTTON}">결과 확인하기</button>
    `;
  },
  statisticSectionWrap: (winningStatistic, earningRate) => {
    return `
      <section id="statistic-section">
        <h2>🏆 당첨 통계 🏆</h2>
        <table id="statistic-table">
          <tr>
            <th>일치 갯수</th>
            <th>당첨금</th>
            <th>당첨 갯수</th>
          </tr>
          <tr>
            <td>3개</td>
            <td>5,000</td>
            <td>n개</td>
          </tr>
          <tr>
            <td>4개</td>
            <td>50,000</td>
            <td>n개</td>
          </tr>
          <tr>
            <td>5개</td>
            <td>1,500,000</td>
            <td>n개</td>
          </tr>
          <tr>
            <td>5개+보너스볼</td>
            <td>30,000,000</td>
            <td>n개</td>
          </tr>
          <tr>
            <td>6개</td>
            <td>2,000,000,000</td>
            <td>n개</td>
          </tr>
        </table>
        <p id="ratio-result">당신의 총 수익률은 <span></span>%입니다.</p>
        <button id="reset-button">다시 시작하기</button>
      </section>
    `;
  },
};

export default template;
