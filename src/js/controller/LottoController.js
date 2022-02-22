export default class LottoController {
  constructor() {
    this.bindEvents();
  }

  bindEvents() {}

  purchaseFormHandler(e) {
    e.preventDefault();

    const money = this.view.getMoneyToPurchase();

    try {
      // validate
      // 유효성 검사 -> bool
      // model 금액 저장
      // view 보여줘라
    } catch (error) {}
  }
}
