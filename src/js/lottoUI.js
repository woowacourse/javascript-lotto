import { $, $$, disableElement } from './utils/dom.js';
import { UI_SETTINGS, DOM_CLASSES } from './utils/constants.js';
export default class LottoUI {
  constructor() {
  }

  initUI() {
    this.renderMoneyInputUI();
  }

  renderMoneyInputUI() {
    $(`.${DOM_CLASSES.MONEY_INPUT_CONTAINER}`).insertAdjacentHTML('beforeend', `
    <form class= "${DOM_CLASSES.MONEY_FORM} mt-5">
      <label class="mb-2 d-inline-block">구입할 금액을 입력해주세요.
      </label>
      <div class="d-flex">
        <input type="number" step='0.1' class="w-100 mr-2 pl-2 ${DOM_CLASSES.MONEY_FORM_INPUT}" placeholder="구입 금액" />
        <button type="submit" class="btn btn-cyan ${DOM_CLASSES.MONEY_FORM_SUBMIT}">확인</button>
      </div>
    </form>
    `);
  }

  renderCheckLottoUI(lottoTickets) {
    disableElement(`.${DOM_CLASSES.MONEY_FORM_SUBMIT}`);
    $(`.${DOM_CLASSES.LOTTO_CONTAINER}`).insertAdjacentHTML('beforeend', `
      <section class= "mt-9">
        <div class="d-flex">
          <label class="flex-auto my-0">총 ${lottoTickets.length}개를 구매하였습니다.</label>
          <div class="flex-auto d-flex justify-end pr-1">
            <label class="switch">
              <input type="checkbox" ${UI_SETTINGS.DEFAULT_VISIBILITY ? 'checked' : ''}/>
              <span class="text-base font-normal ${DOM_CLASSES.LOTTO_SWITCH}">번호보기</span>
            </label>
          </div>
        </div>
        <div class="d-flex flex-wrap lotto-ticket-container">
        ${lottoTickets.reduce((acc, numbers) => acc + this.makeTicketElement(numbers), '')}
        </div>
      </section>
      `);
  }

  makeTicketElement(numbers) {
    return `
    <span class= "mx-1 text-4xl ${DOM_CLASSES.LOTTO_TICKET}">
      🎟️
      <span class="${DOM_CLASSES.LOTTO_TICKET_NUMBER}${UI_SETTINGS.DEFAULT_VISIBILITY ? '' : ' hidden'}">
        ${numbers.join(', ')}
      </span>
    </span>
      `;
  }

  toggleLottoNumbers() {
    $$(`.${DOM_CLASSES.LOTTO_TICKET_NUMBER}`).forEach(lottoTicket => {
      lottoTicket.classList.toggle('hidden');
    });
  }

  renderResultInputUI() {
    $(`.${DOM_CLASSES.RESULT_INPUT_CONTAINER}`).insertAdjacentHTML('beforeend', `
      <form class= "mt-9">
          <label class="flex-auto d-inline-block mb-3 result-info">지난 주 당첨번호 6개와 보너스 넘버 1개를 입력해주세요.</label>
          <div class="d-flex">
            <div>
              <h4 class="mt-0 mb-3 text-center">당첨 번호</h4>
              <div>
                <input type="number" class="winning-number mx-1 text-center" />
                <input type="number" class="winning-number mx-1 text-center" />
                <input type="number" class="winning-number mx-1 text-center" />
                <input type="number" class="winning-number mx-1 text-center" />
                <input type="number" class="winning-number mx-1 text-center" />
                <input type="number" class="winning-number mx-1 text-center" />
              </div>
            </div>
            <div class="bonus-number-container flex-grow">
              <h4 class="mt-0 mb-3 text-center">보너스 번호</h4>
              <div class="d-flex justify-center">
                <input type="number" class="bonus-number text-center" />
              </div>
            </div>
          </div>
          <button type="button" class="open-result-modal-button mt-5 btn btn-cyan w-100">
        결과 확인하기
          </button>
        </form>
      `);
  }
}
