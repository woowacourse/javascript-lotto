import { on } from './utils/helper.js';
import { isValidPurchaseMoney } from './utils/validator.js';

export default class LottoController {
  constructor(lottoModel, views) {
    this.lottoModel = lottoModel;
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
    on(
      this.lottoPurchaseResultView.showLottoToggle,
      '@lottoToggle',
      this.submitLottoToggle.bind(this)
    );
  }

  submitLottoToggle() {
    this.lottoPurchaseResultView.toggleLottoNumbers();
  }

  submitPurchaseLotto(event) {
    const purchaseMoney = event.detail;
    if (!isValidPurchaseMoney(purchaseMoney)) {
      return alert('문제!');
    }
    this.lottoPurchaseResultView.renderLottoPurchaseCount(purchaseMoney / 1000);
    this.lottoModel.setLottoList(purchaseMoney / 1000);
    this.lottoPurchaseResultView.renderLottoPurchaseResult(
      this.lottoModel.getLottoList()
    );
  }
}
