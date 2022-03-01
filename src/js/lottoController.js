import { on } from './utils/helper.js';
import { isDividedByThousand, isEmptyValue, isMaxPurchaseLotto, isNotPurchaseLotto, isPositiveValue, userLottoNumberCorrectRange, userLottoNumberOverlap, userLottoNumberPositiveValue } from './utils/validator.js';
import { LOTTO } from './utils/constants.js';
import ResultLottoDatas from './models/resultLottoDatas.js';

export default class LottoController {
  constructor (inputLottoDatas, { lottoPurchaseInputView, lottoPurchaseResultView, userLottoNumberView, userLottoModalView }) {
    this.inputLottoDatas = inputLottoDatas;

    this.lottoPurchaseInputView = lottoPurchaseInputView;
    this.lottoPurchaseResultView = lottoPurchaseResultView;
    this.userLottoNumberView = userLottoNumberView;
    this.userLottoModalView = userLottoModalView;
  }

  init() {
    this.submitView();
  }

  submitView() {
    on(this.lottoPurchaseInputView.lottoPurchaseForm, '@purchaseMoney', this.submitPurchaseLotto.bind(this));
    on(this.lottoPurchaseResultView.showLottoToggle, '@lottoToggle', this.submitLottoToggle.bind(this));
    on(this.userLottoNumberView.userLottoResultForm, '@userLottoNumbers', this.submitUserLottoNumbers.bind(this));
    on(this.userLottoModalView.lottoModalCloseButton, '@closeLottoModal', this.submitCloseLottoModal.bind(this));
    on(this.userLottoModalView.lottoRestartButton, '@lottoRestart', this.submitRestartLotto.bind(this));
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
    this.inputLottoDatas.setPurchaseMoney(purchaseMoney);
    this.lottoPurchaseResultView.renderLottoPurchaseResult(ResultLottoDatas.getLottoList());
  }

  submitUserLottoNumbers(event) {
    const lottoNumbers = event.detail.lottoNumber;
    const bonusNumber = event.detail.bonusNumber;
    const holeLottoNumber = [...lottoNumbers, ...bonusNumber];
    try {
      userLottoNumberPositiveValue(holeLottoNumber);
      userLottoNumberOverlap(holeLottoNumber);
      userLottoNumberCorrectRange(holeLottoNumber);
      isNotPurchaseLotto(ResultLottoDatas.getLottoList());
    } catch (error) {
      return alert(error);
    }
    this.inputLottoDatas.setUserLotto(lottoNumbers, bonusNumber);
    this.userLottoModalView.cleanLottoResultModal();
    this.userLottoModalView.showLottoResultModal();
    this.userLottoModalView.showLottoResult(ResultLottoDatas.getUserLottoResult(), ResultLottoDatas.getUserReturnRate());
  }

  submitCloseLottoModal() {
    this.userLottoModalView.hideLottoResultModal();
  }

  submitRestartLotto() {
    this.userLottoModalView.hideLottoResultModal();
    this.lottoPurchaseResultView.cleanLottoList();
    this.lottoPurchaseInputView.cleanLottoPurchaseInput();
    this.userLottoNumberView.cleanUserLottoInput();
    this.inputLottoDatas.initPurchaseLotto();
  }

}
