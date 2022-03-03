import { on } from './utils/helper.js';
import { isValidPurchaseMoney } from './utils/validator.js';
import { LOTTO, ERROR_MESSAGE } from './utils/constants.js';

export default class LottoController {
  #lottoCreator;

  #lottoPurchaseInputView;

  #lottoPurchaseResultView;

  #lottoWinningNumberInputView;

  constructor(lottoCreator, views) {
    this.#lottoCreator = lottoCreator;

    this.#lottoPurchaseInputView = views.lottoPurchaseInputView;
    this.#lottoPurchaseResultView = views.lottoPurchaseResultView;
    this.#lottoWinningNumberInputView = views.lottoWinningNumberInputView;
  }

  init() {
    this.#submitInitialView();
  }

  #submitInitialView() {
    on(
      this.#lottoPurchaseInputView.lottoPurchaseForm,
      '@purchaseMoney',
      this.#submitPurchaseLotto.bind(this)
    );
    on(
      this.#lottoPurchaseResultView.showLottoToggle,
      '@lottoToggle',
      this.#submitLottoToggle.bind(this)
    );
  }

  #submitLottoWinningNumberInputView() {
    on(
      this.#lottoWinningNumberInputView.lottoMatchResultForm,
      '@matchResult',
      this.#submitMatchResult.bind(this)
    );
  }

  #submitLottoToggle() {
    this.#lottoPurchaseResultView.toggleLottoNumbers();
  }

  // eslint-disable-next-line max-lines-per-function
  #submitPurchaseLotto(event) {
    const purchaseMoney = event.detail;

    if (!isValidPurchaseMoney(purchaseMoney)) {
      alert(ERROR_MESSAGE.IS_NOT_VALID_PURCHASE_MONEY);
      this.#lottoPurchaseInputView.resetPurchaseMoney();

      return;
    }

    this.#lottoPurchaseInputView.disablePurchaseLottoForm();

    // 로또 자동 번호 생성 및 렌더링
    this.#lottoPurchaseResultView.renderLottoPurchaseCount(
      purchaseMoney / LOTTO.COST_UNIT
    );
    this.#lottoCreator.createLottoList(purchaseMoney / LOTTO.COST_UNIT);
    this.#lottoPurchaseResultView.renderLottoPurchaseResult(
      this.#lottoCreator.lottoList
    );

    // 당첨 번호 입력 렌더링
    this.#lottoWinningNumberInputView.renderlottoWinningNumberInput();
    this.#lottoWinningNumberInputView.selectDOM();
    this.#lottoWinningNumberInputView.attachEvents();
    this.#submitLottoWinningNumberInputView();
  }

  #submitMatchResult(event) {
    const { lottoWinningNumbers, lottoWinningBonusNumber } = event.detail;

    console.log(lottoWinningNumbers, lottoWinningBonusNumber);
  }

  // #submitBlockNotNumberInput(event) {
  //   event.preventDefault();
  //   console.log(event.detail);
  // }
}
