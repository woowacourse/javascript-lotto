import { validateMoney } from '../validator/moneyValidator';

export default class LottoController {
  constructor() {
    this.bindEvents();
  }

  bindEvents() {}

  purchaseFormHandler(e) {
    e.preventDefault();

    const money = this.view.getMoneyToPurchase();

    try {
      validateMoney(money);
      // model 금액 저장
      // view 보여줘라
    } catch (error) {}
  }
}
