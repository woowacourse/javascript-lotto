import { on } from '../utils/event.js';
import EVENT from '../constants/event.js';

/**
 * @module controller/LottoController
 */
/**
 * @class module:controller/LottoController.LottoController
 * @classdesc view와 model을 연결하는 controller
 */
export default class LottoController {
  constructor(lottoBundle, purchaseView, issuedTicketView, lottoResult) {
    this.lottoBundle = lottoBundle;
    this.lottoResult = lottoResult;
    this.purchaseView = purchaseView;
    this.issuedTicketView = issuedTicketView;
    this.#subscribeViewEvents();
  }

  /** @method purchaseLotto
   * @description 뷰의 엘리먼트에서 발생하는 커스텀 이벤트를 구독하고, 발생이 감지되면 콜백함수를 호출한다.
   */
  #subscribeViewEvents() {
    on(this.purchaseView.$purchaseForm, EVENT.SUBMIT, (e) =>
      this.#purchaseLotto(e.detail.money),
    );

    on(this.issuedTicketView.$lottoNumberToggle, EVENT.TOGGLE, (e) =>
      this.#toggleDetails(e.detail.checked),
    );
  }

  /** @method purchaseLotto
   * @param {number} money 로또를 구입하기 위해 입력된 금액
   * @description 입력된 금액에 대해 유효성 검사를 하고, 모델에게 로또 번들을 만들도록 시키고, 뷰에게 렌더링을 하도록 시킨다.
   */
  #purchaseLotto(money) {
    try {
      this.lottoBundle.setMoney(money);
      this.lottoBundle.setCount();
      this.lottoBundle.createLottoBundle();
      this.#renderLotto();
    } catch (error) {
      alert(error.message);
    }
  }

  /** @method renderLotto
   * @description 구입한 로또의 개수만큼 렌더링할 것을 View에 요청한다.
   */
  #renderLotto() {
    this.issuedTicketView.showTicketContainer();
    this.issuedTicketView.renderTicketCount();
    this.issuedTicketView.renderIssuedTickets();
    this.purchaseView.deactivatePurchaseForm();
  }

  /** @method toggleDetails
   * @param {boolean} checked 로또 상세보기 toggle 버튼의 check 여부
   */
  #toggleDetails(checked) {
    if (checked) {
      this.issuedTicketView.showTicketDetails();
      return;
    }

    this.issuedTicketView.hideTicketDetails();
  }
}
