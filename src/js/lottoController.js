import { on } from './utils/helper.js';
import { isDividedByThousand, isEmptyValue, isMaxPurchaseLotto, isPositiveValue, userLottoNumberCorrectRange, userLottoNumberOverlap, userLottoNumberPositiveValue } from './utils/validator.js';
import { LOTTO } from './utils/constants.js';

export default class LottoController {
  constructor (lottoModel, { lottoPurchaseInputView, lottoPurchaseResultView, userLottoNumberView }) {
    this.lottoModel = lottoModel;
    this.lottoPurchaseInputView = lottoPurchaseInputView;
    this.lottoPurchaseResultView = lottoPurchaseResultView;
    this.userLottoNumberView = userLottoNumberView;
  }

  init() {
    this.submitView();
  }

  submitView() {
    on(this.lottoPurchaseInputView.lottoPurchaseForm, '@purchaseMoney', this.submitPurchaseLotto.bind(this));
    on(this.lottoPurchaseResultView.showLottoToggle, '@lottoToggle', this.submitLottoToggle.bind(this));
    on(this.userLottoNumberView.userLottoResultForm, '@userLottoNumbers', this.submitUserLottoNumbers.bind(this));
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
      this.lottoPurchaseInputView.cleanLottoPurchaseInput();
      return alert(error);
    }
    this.lottoPurchaseResultView.cleanLottoList();
    this.lottoPurchaseResultView.renderLottoPurchaseCount(purchaseMoney / LOTTO.COST_UNIT);
    this.lottoModel.setLottoList(purchaseMoney / LOTTO.COST_UNIT);
    this.lottoPurchaseResultView.renderLottoPurchaseResult(this.lottoModel.getLottoList());
  }

  submitUserLottoNumbers(event) {
    const lottoNumbers = event.detail.lottoNumber;
    const bonusNumber = event.detail.bonusNumber;
    const holeLottoNumber = [...lottoNumbers, ...bonusNumber];
    try {
      userLottoNumberOverlap(holeLottoNumber);
      userLottoNumberCorrectRange(holeLottoNumber);
      userLottoNumberPositiveValue(holeLottoNumber);
    } catch (error) {
      return alert(error);
    }
  }
}
