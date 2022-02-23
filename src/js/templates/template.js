const template = {
  app: (props) => {
    const { lottoList, isShowNumber } = props;

    return `
      <h4 id="title">🎱 행운의 로또</h4>
      <section id="payment-section">
        ${template.paymentSection()}
      </section>
      <section id="ticket-section">
        ${template.ticketSection({ lottoList, isShowNumber })}
      </section>
      <section id="winning-number-section">
        ${template.winningNumberSection()}
      </section>
    `;
  },
  paymentSection: () => {
    return `
      <label>구입할 금액을 입력해주세요.</label>
      <form>
        <input type="number" id="payment-input" />
        <button id="payment-submit">구입</button>
      </form>
    `;
  },
  ticketSection: (props) => {
    const { lottoList, isShowNumber } = props;

    return `
      <div id="ticket-list-wrap">
        ${template.ticketListWrap({ lottoList, isShowNumber })}
      </div>
      <div id="show-number-toggle-area">
        ${template.showNumberToggleArea({ isShowNumber })}
      </div>
    `;
  },
  showNumberToggleArea: ({ isShowNumber }) => {
    return `
      <label for="slider">번호 보기</label>
      <label class="switch">
        <input id="slider" type="checkbox" ${isShowNumber ? 'checked' : ''}/>
        <span class="slider round"></span>
      </label>
    `;
  },
  ticketListWrap: ({ lottoList, isShowNumber }) => {
    return `
      <label>총 <span>${lottoList.length}</span>개를 구매하였습니다.</label>
      <ul id="ticket-list" class="${
        (isShowNumber && 'ticket-list-column') || 'ticket-list-row'
      }">
        ${lottoList
          .map(
            (lotto) =>
              `<li class="ticket">
              <p>🎟
              ${
                (isShowNumber &&
                  `<span class="ticket-numbers">${lotto
                    .getNumbers()
                    .join(', ')}</span>`) ||
                ''
              }
              
              </p>
              </li>`
          )
          .join('')}
      </ul>
    `;
  },
  winningNumberSection: () => {
    return `
      <label>지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</label>
      <fieldset id="winning-number-fieldset">
        <form id="winning-number-form">
          <label for="">당첨 번호</label>
          <div id="winning-number-input-wrap">
            <input class="winning-number-input" type="text" />
            <input class="winning-number-input" type="text" />
            <input class="winning-number-input" type="text" />
            <input class="winning-number-input" type="text" />
            <input class="winning-number-input" type="text" />
            <input class="winning-number-input" type="text" />
          </div>
        </form>
        <form id="bonus-number-form">
          <label for="">보너스 번호</label>
          <input class="winning-number-input" type="text" />
        </form>
      </fieldset>
      <button id="show-result-button">결과 확인하기</button>
    `;
  },
};

export default template;
