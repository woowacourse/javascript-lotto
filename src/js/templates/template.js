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
    `;
  },
  paymentSection: () => {
    return `
      <label>구입할 금액을 입력해주세요.</label>
      <form>
        <input type="number" id="${DOM_STRING.PAYMENT_INPUT}" />
        <button id="${DOM_STRING.PAYMENT_SUBMIT}">구입</button>
      </form>
    `;
  },
  ticketSection: () => {
    return `
      <div id="${DOM_STRING.TICKET_LIST_WRAP}">
      </div>
      <div id="${DOM_STRING.SHOW_NUMBER_TOGGLE_AREA}">
      </div>
    `;
  },
  ticketListWrap: (lottoList, isShowNumber) => {
    return `
      <label>총 <span>${lottoList.length}</span>개를 구매하였습니다.</label>
      <ul id="${DOM_STRING.TICKET_LIST}" class="${
      isShowNumber ? DOM_STRING.TICKET_LIST_COLUMN : DOM_STRING.TICKET_LIST_ROW
    }">
        ${lottoList
          .map(
            (lotto) =>
              `<li class="${DOM_STRING.TICKET}">
              <p>🎟
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
      <label for="${DOM_STRING.SLIDER}">번호 보기</label>
      <label class="${DOM_STRING.SWITCH}">
        <input id="${DOM_STRING.SLIDER}" type="checkbox" ${
      isShowNumber ? 'checked' : ''
    }/>
        <span class="${DOM_STRING.SLIDER} round"></span>
      </label>
    `;
  },
  winningNumberSection: () => {
    return `
      <label>지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</label>
      <fieldset id="${DOM_STRING.WINNING_NUMBER_FIELDSET}">
        <form id="${DOM_STRING.WINNING_NUMBER_FORM}">
          <label for="">당첨 번호</label>
          <div id="${DOM_STRING.WINNING_NUMBER_INPUT_WRAP}">
            ${`<input class="${DOM_STRING.WINNING_NUMBER_INPUT}" type="text" />`.repeat(
              LOTTO.NUMBER_LENGTH
            )}
          </div>
        </form>
        <form id="${DOM_STRING.BONUS_NUMBER_FORM}">
          <label for="">보너스 번호</label>
          <input class="${DOM_STRING.WINNING_NUMBER_INPUT}" type="text" />
        </form>
      </fieldset>
      <button id="${DOM_STRING.SHOW_RESULT_BUTTON}">결과 확인하기</button>
    `;
  },
};

export default template;
