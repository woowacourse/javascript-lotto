import View from '../core/View.js';
import { DOM_STRING } from '../configs/contants.js';

export default class TicketSectionView extends View {
  setup() {
    this.state = { lottoList: [], isShowNumber: false };
  }

  template() {
    const { lottoList, isShowNumber } = this.state;

    return `
      <div id="${DOM_STRING.TICKET_LIST_WRAP}">
        <label class="${DOM_STRING.HINT}">
          총 <span>${lottoList.length}</span>개를 구매하였습니다.
        </label>
        <ul
          id="${DOM_STRING.TICKET_LIST}"
          class="${
            (isShowNumber && DOM_STRING.TICKET_LIST_COLUMN) ||
            DOM_STRING.TICKET_LIST_ROW
          }"
        >
          ${lottoList
            .map(
              (lotto) => `<li class="${DOM_STRING.TICKET}">
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
        <label class="${DOM_STRING.HINT}" for="${
      DOM_STRING.SLIDER
    }">번호 보기</label>
        <label class="${DOM_STRING.SWITCH}">
          <input
            id="${DOM_STRING.SLIDER}"
            type="checkbox" ${isShowNumber ? 'checked' : ''}
            ${(lottoList.length === 0 && 'disabled') || ''}
          >
          <span class="${DOM_STRING.SLIDER} round"></span>
        </label>
      </div>
    `;
  }

  bindOnClickNumberToggle() {
    this.bindEventListener(
      'click',
      { attributeName: DOM_STRING.SLIDER, attributeType: 'id' },
      () => {
        this.toggleIsShowNumber();
      }
    );
  }

  toggleIsShowNumber() {
    const { isShowNumber } = this.state;
    this.update({ isShowNumber: !isShowNumber });
  }
}
