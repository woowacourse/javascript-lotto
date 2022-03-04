import { on } from './utils/helper.js';
import { isDividedByThousand, isEmptyValue, isMaxPurchaseLotto, isNotPurchaseLotto, isPositiveValue, userLottoNumberCorrectRange, userLottoNumberOverlap, userLottoNumberPositiveValue } from './utils/validator.js';
import { LOTTO, MESSAGE } from './utils/constants.js';
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
    on(this.lottoPurchaseInputView.lottoPurchaseInput, '@purchaseMoney', this.checkPurchaseMoney.bind(this));
    on(this.lottoPurchaseInputView.lottoPurchaseForm, '@purchaseMoney', this.submitPurchaseLotto.bind(this));
    on(this.lottoPurchaseResultView.lottoToggle, '@lottoToggle', this.clickLottoToggle.bind(this));
    on(this.userLottoNumberView.userLottoResultForm, '@userLottoNumbers', this.submitUserLottoNumbers.bind(this));
    on(this.userLottoModalView.lottoModalCloseButton, '@closeLottoModal', this.submitCloseLottoModal.bind(this));
    on(this.userLottoModalView.lottoRestartButton, '@lottoRestart', this.submitRestartLotto.bind(this));
  }

  checkPurchaseMoney(event) {
    const purchaseMoney = event.detail;
    try {
      isDividedByThousand(purchaseMoney);
      isEmptyValue(purchaseMoney);
      isPositiveValue(purchaseMoney);
      isMaxPurchaseLotto(purchaseMoney);
    } catch (error) {
      return this.lottoPurchaseInputView.insertPurchaseValidateText(error);
    }
    this.lottoPurchaseInputView.insertPurchaseValidateText(MESSAGE.CAN_PURCHASE_LOTTO);
  }

  clickLottoToggle() {
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
    this.lottoPurchaseResultView.showLottoToggleButton();
    this.userLottoNumberView.showUserLottoInput();
    this.lottoPurchaseResultView.renderLottoPurchaseCount(purchaseMoney / LOTTO.COST_UNIT);
    this.inputLottoDatas.setPurchaseMoney(purchaseMoney);
    this.lottoPurchaseResultView.renderLottoPurchaseResult(ResultLottoDatas.getLottoList());
  }

  submitUserLottoNumbers(event) {
    const lottoNumbers = event.detail.lottoNumber;
    const bonusNumber = event.detail.bonusNumber;
    const holeLottoNumbers = [...lottoNumbers, ...bonusNumber];
    try {
      userLottoNumberPositiveValue(holeLottoNumbers);
      userLottoNumberOverlap(holeLottoNumbers);
      userLottoNumberCorrectRange(holeLottoNumbers);
      isNotPurchaseLotto(ResultLottoDatas.getPurchaseMoney());
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
