import { on } from './utils/helper.js';
import {
  isValidPurchaseMoney,
  isValidLottoWinningNumbers,
  isValidLottoWinningBonusNumber,
} from './utils/validator.js';
import { LOTTO, ERROR_MESSAGE } from './utils/constants.js';

export default class LottoController {
  #lottoCreator;

  #lottoResultManager;

  #lottoPurchaseInputView;

  #lottoPurchaseResultView;

  #lottoWinningNumberInputView;

  #lottoResultView;

  constructor(models, views) {
    this.#lottoCreator = models.lottoCreator;
    this.#lottoResultManager = models.lottoResultManager;

    this.#lottoPurchaseInputView = views.lottoPurchaseInputView;
    this.#lottoPurchaseResultView = views.lottoPurchaseResultView;
    this.#lottoWinningNumberInputView = views.lottoWinningNumberInputView;
    this.#lottoResultView = views.lottoResultView;
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

    if (isValidPurchaseMoney(purchaseMoney)) {
      this.#lottoCreator.purchaseMoney = purchaseMoney;
      this.#lottoPurchaseInputView.disableForm();

      // 로또 자동 번호 생성 및 렌더링
      this.#lottoCreator.createLottoList();
      this.#lottoPurchaseResultView.render(
        this.#lottoCreator.purchaseMoney / LOTTO.COST_UNIT,
        this.#lottoCreator.lottoList
      );

      // 당첨 번호 입력 렌더링
      this.#lottoWinningNumberInputView.render();
      this.#submitLottoWinningNumberInputView();

      return;
    }

    alert(ERROR_MESSAGE.IS_NOT_VALID_PURCHASE_MONEY);

    this.#lottoPurchaseInputView.reset();
  }

  // eslint-disable-next-line max-lines-per-function
  #submitMatchResult(event) {
    const { lottoWinningNumbers, lottoWinningBonusNumber } = event.detail;

    if (
      isValidLottoWinningNumbers(lottoWinningNumbers, LOTTO.MIN_DIGIT, LOTTO.MAX_DIGIT) &&
      isValidLottoWinningBonusNumber(
        lottoWinningNumbers,
        lottoWinningBonusNumber,
        LOTTO.MIN_DIGIT,
        LOTTO.MAX_DIGIT
      )
    ) {
      this.#lottoResultManager.createLottoMatchingResult(
        lottoWinningNumbers,
        lottoWinningBonusNumber,
        this.#lottoCreator.lottoList
      );

      this.#lottoResultView.render(this.#lottoResultManager.lottoMatchingResult);

      return;
    }
    alert(ERROR_MESSAGE.IS_NOT_VALID_LOTTO_WINNING_NUMBERS);

    this.#lottoWinningNumberInputView.reset();
  }
}

// #submitBlockNotNumberInput(event) {
//   event.preventDefault();
//   console.log(event.detail);
// }
