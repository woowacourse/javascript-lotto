import ticketTemplate from '../layouts/template.js';
import { emit, on } from '../utils/event.js';
import { $, $$ } from '../utils/selector.js';
import ID from '../constants/selector.js';
import EVENT from '../constants/event.js';

/**
 * @module view/IssuedTicketView
 */

/**
 * @class module:view/IssuedTicketView.IssuedTicketView
 * @classdesc 발행된 로또 티켓 섹션 화면을 담당하는 view 클래스
 */
export default class IssuedTicketView {
  constructor(model) {
    this.model = model;
    this.$ticketContainer = $(ID.TICKET_CONTAINER);
    this.$ticketCount = $(ID.TICKET_COUNT);
    this.$issuedTicketDiv = $(ID.ISSUED_TICKET_DIV);
    this.$lottoNumberToggle = $(ID.LOTTO_NUMBER_TOGGLE);
    this.#bindEvents();
  }

  /** @method bindEvents
   * @description 해당 뷰의 엘리먼트에서 발생하는 이벤트를 바인딩한다.
   */
  #bindEvents() {
    on(this.$lottoNumberToggle, 'click', (e) => this.#handleToggle(e));
  }

  /** @method handleToggle
   * @description 토글 클릭 시 '@toggle' 커스텀 이벤트를 emit한다.
   */
  #handleToggle(e) {
    const { checked } = e.target;
    emit(this.$lottoNumberToggle, EVENT.TOGGLE, { checked });
  }

  /**
   * @description 해당 뷰의 엘리먼트에서 발생하는 이벤트를 바인딩한다.
   */
  showTicketContainer() {
    this.$ticketContainer.classList.replace('hidden', 'show');
  }

  /**
   * @description 구입한 로또 개수를 화면에 렌더링한다.
   * @param {number} count 구입되어 출력되어야 하는 로또의 개수
   */
  renderTicketCount() {
    this.$ticketCount.textContent = this.model.count;
  }

  /**
   * @description 구입한 로또 상세정보를 화면에 렌더링한다.
   * @param {array} lottos 6개의 숫자로 이뤄진 로또 배열들을 구입된 로또 개수만큼 요소로 갖는 배열
   */
  renderIssuedTickets() {
    const template = this.model.lottos
      .map((lotto) => ticketTemplate(lotto.numbers))
      .join('');
    this.$issuedTicketDiv.insertAdjacentHTML('beforeend', template);
  }

  /**
   * @description 구입한 로또의 번호를 화면에 표시한다.
   */
  showTicketDetails() {
    this.$issuedTicketDiv.classList.remove('align-row');
    $$('.ticket-numbers').forEach((ticketContainer) => {
      ticketContainer.classList.remove('hidden');
    });
  }

  /**
   * @description 구입한 로또의 번호를 화면에서 숨긴다.
   */
  hideTicketDetails() {
    this.$issuedTicketDiv.classList.add('align-row');
    $$('.ticket-numbers').forEach((ticketContainer) => {
      ticketContainer.classList.add('hidden');
    });
  }
}
