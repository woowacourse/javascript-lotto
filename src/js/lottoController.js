import { on } from './utils/helper.js';
import { isValidPurchaseMoney } from './utils/validator.js';

export default class LottoController {
  constructor(lottoModel, views) {
    this.model = lottoModel;
    this.lottoPurchaseInputView = views.lottoPurchaseInputView;
    this.lottoPurchaseResultView = views.lottoPurchaseResultView;
    this.lottoNumberInputView = views.lottoPurchaseInputView;

    this.submitView();
  }

  submitView() {
    on(
      this.lottoPurchaseInputView.lottoPurchaseForm,
      '@purchaseMoney',
      this.submitPurchaseLotto.bind(this)
    );
  }

  submitPurchaseLotto(event) {
    const purchaseMoney = event.detail;
    if (isValidPurchaseMoney(purchaseMoney)) {
      return console.log(purchaseMoney);
    }

    alert('문제!')
  }
}
