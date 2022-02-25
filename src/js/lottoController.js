import { on } from './utils/helper.js';
import { isDividedByThousand, isEmptyValue, isMaxPurchaseLotto, isPositiveValue } from './utils/validator.js';
import { LOTTO, ERROR_MESSAGE } from './utils/constants.js';

export default class LottoController {
  constructor (lottoModel, views) {
    this.lottoModel = lottoModel;
    this.lottoPurchaseInputView = views.lottoPurchaseInputView;
    this.lottoPurchaseResultView = views.lottoPurchaseResultView;
    this.lottoNumberInputView = views.lottoPurchaseInputView;
  }

  init() {
    this.submitView();
  }

  submitView() {
    on(this.lottoPurchaseInputView.lottoPurchaseForm, '@purchaseMoney', this.submitPurchaseLotto.bind(this));
    on(this.lottoPurchaseResultView.showLottoToggle, '@lottoToggle', this.submitLottoToggle.bind(this));
  }

  submitLottoToggle() {
    this.lottoPurchaseResultView.toggleLottoNumbers();
  }

  submitPurchaseLotto(event) {
    const purchaseMoney = event.detail;
    try {
      isDividedByThousand(purchaseMoney);
      isEmptyValue(purchaseMoney);
      isPositiveValue(purchaseMoney);
      isMaxPurchaseLotto(purchaseMoney);
    } catch (error) {
      this.lottoNumberInputView.cleanLottoPurchaseInput();
      return alert(error);
    }
    this.lottoPurchaseResultView.cleanLottoList();
    this.lottoPurchaseResultView.renderLottoPurchaseCount(purchaseMoney / LOTTO.COST_UNIT);
    this.lottoModel.setLottoList(purchaseMoney / LOTTO.COST_UNIT);
    this.lottoPurchaseResultView.renderLottoPurchaseResult(this.lottoModel.getLottoList());
  }
}
