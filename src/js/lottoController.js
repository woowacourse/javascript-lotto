import { on } from './utils/helper.js';
import {
  isDividedByThousand,
  isEmptyValue,
  isPositiveValue,
  isNotDuplicateNumberExistInArray,
  isNotIncludeSameNumber,
  isNumberInRange,
  isAllNumberInRange,
} from './utils/validator.js';
import { LOTTO, ERROR_MESSAGE } from './utils/constants.js';

export default class LottoController {
  #lottoCreator;

  #lottoResultManager;

  #lottoPurchaseInputView;

  #lottoPurchaseResultView;

  #lottoWinningNumberInputView;

  #lottoMatchResultView;

  constructor(models, views) {
    this.#lottoCreator = models.lottoCreator;
    this.#lottoResultManager = models.LottoResultManager;

    this.#lottoPurchaseInputView = views.lottoPurchaseInputView;
    this.#lottoPurchaseResultView = views.lottoPurchaseResultView;
    this.#lottoWinningNumberInputView = views.lottoWinningNumberInputView;
    this.#lottoMatchResultView = views.lottoMatchResultView;
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
    on(this.#lottoMatchResultView.restartButton, '@restart', this.#submitRestart.bind(this));
  }

  #submitLottoToggle() {
    this.#lottoPurchaseResultView.toggleLottoNumbers();
  }

  // eslint-disable-next-line max-lines-per-function
  #submitPurchaseLotto(event) {
    const purchaseMoney = event.detail;

    if (LottoController.isValidPurchaseMoney(purchaseMoney)) {
      this.#lottoCreator.purchaseMoney = purchaseMoney;
      this.#lottoPurchaseInputView.disableForm();

      this.#lottoCreator.createLottoList();
      this.#lottoPurchaseResultView.render(
        this.#lottoCreator.purchaseMoney / LOTTO.COST_UNIT,
        this.#lottoCreator.lottoList
      );

      this.#lottoWinningNumberInputView.render();
      this.#submitLottoWinningNumberInputView();

      return;
    }
    alert(ERROR_MESSAGE.IS_NOT_VALID_PURCHASE_MONEY);
    this.#lottoPurchaseInputView.reset();
  }

  #submitRestart() {
    this.#lottoPurchaseInputView.restart();
    this.#lottoCreator.restart();
    this.#lottoPurchaseResultView.restart();
    this.#lottoWinningNumberInputView.restart();
  }

  #submitLottoWinningNumberInputView() {
    on(
      this.#lottoWinningNumberInputView.lottoMatchResultForm,
      '@matchResult',
      this.#submitMatchResult.bind(this)
    );
  }

  // eslint-disable-next-line max-lines-per-function
  #submitMatchResult(event) {
    const { lottoWinningNumbers, lottoWinningBonusNumber } = event.detail;

    if (
      LottoController.isValidLottoWinningNumbers(
        lottoWinningNumbers,
        LOTTO.MIN_DIGIT,
        LOTTO.MAX_DIGIT
      ) &&
      LottoController.isValidLottoWinningBonusNumber(
        lottoWinningNumbers,
        lottoWinningBonusNumber,
        LOTTO.MIN_DIGIT,
        LOTTO.MAX_DIGIT
      )
    ) {
      const lottoMatchResult = this.#lottoResultManager.calcLottoMatchingResult(
        lottoWinningNumbers,
        lottoWinningBonusNumber,
        this.#lottoCreator.lottoList
      );
      const profit = this.#lottoResultManager.calcProfit(
        this.#lottoCreator.purchaseMoney,
        lottoMatchResult
      );

      this.#lottoMatchResultView.render(lottoMatchResult, profit);

      return;
    }
    alert(ERROR_MESSAGE.IS_NOT_VALID_LOTTO_WINNING_NUMBERS);

    this.#lottoWinningNumberInputView.reset();
  }

  static isValidPurchaseMoney(purchaseMoney) {
    return (
      isDividedByThousand(purchaseMoney) &&
      !isEmptyValue(purchaseMoney) &&
      isPositiveValue(purchaseMoney)
    );
  }

  static isValidLottoWinningNumbers(lottoWinningNumbers, min, max) {
    return (
      isNotDuplicateNumberExistInArray(lottoWinningNumbers) &&
      isAllNumberInRange(lottoWinningNumbers, min, max)
    );
  }

  static isValidLottoWinningBonusNumber(lottoWinningNumbers, lottoWinningBonusNumber, min, max) {
    return (
      isNumberInRange(lottoWinningBonusNumber, min, max) &&
      isNotIncludeSameNumber(lottoWinningNumbers, lottoWinningBonusNumber)
    );
  }
}
