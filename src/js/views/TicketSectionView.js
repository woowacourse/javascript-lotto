import View from '../core/View.js';
import { SELECTOR, DOM_STRING } from '../configs/contants.js';

export default class TicketSectionView extends View {
  setup() {
    this.state = { lottoList: [], isShowNumber: false };
  }

  template() {
    const { lottoList, isShowNumber } = this.state;

    return `
      <div id="${DOM_STRING.TICKET_LIST_WRAP}">
        <label>총 <span>${lottoList.length}</span>개를 구매하였습니다.</label>
        <ul
          id="${DOM_STRING.TICKET_LIST}"
          class="${
            (isShowNumber && DOM_STRING.TICKET_LIST_COLUMN) ||
            DOM_STRING.TICKET_LIST_ROW
          }"
        >
          ${lottoList
            .map(
              (lotto) =>
                `<li class="${DOM_STRING.TICKET}">
                  <p>🎟${
                    (isShowNumber &&
                      `<span class="${
                        DOM_STRING.TICKET_NUMBERS
                      }">${lotto.numbers.join(', ')}</span>`) ||
                    ''
                  }</p>
                </li>`
            )
            .join('')}
        </ul>
      </div>
      <div id="${DOM_STRING.SHOW_NUMBER_TOGGLE_AREA}">
        <label for="${DOM_STRING.SLIDER}">번호 보기</label>
        <label class="${DOM_STRING.SWITCH}">
          <input
            id="${DOM_STRING.SLIDER}"
            type="checkbox" ${isShowNumber ? 'checked' : ''}
          >
          <span class="${DOM_STRING.SLIDER} round"></span>
        </label>
      </div>
    `;
  }

  bindOnClickNumberToggle() {
    this.bindEventListener('click', SELECTOR.SLIDER, () => {
      const { isShowNumber } = this.state;
      this.update({ isShowNumber: !isShowNumber });
    });
  }
}
