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

  #lottoMatchResultModalView;

  constructor(models, views) {
    this.#lottoCreator = models.lottoCreator;
    this.#lottoResultManager = models.LottoResultManager;

    this.#lottoPurchaseInputView = views.lottoPurchaseInputView;
    this.#lottoPurchaseResultView = views.lottoPurchaseResultView;
    this.#lottoWinningNumberInputView = views.lottoWinningNumberInputView;
    this.#lottoMatchResultModalView = views.lottoMatchResultModalView;
    this.#submitInitialView();
  }

  #submitInitialView() {
    on(
      this.#lottoPurchaseInputView.lottoPurchaseForm,
      '@purchaseMoney',
      this.#submitPurchaseLotto.bind(this)
    );
    on(this.#lottoMatchResultModalView.restartButton, '@restart', this.#submitRestart.bind(this));
  }

  #submitPurchaseLotto(event) {
    const purchaseMoney = event.detail;

    try {
      LottoController.validatePurchaseMoney(purchaseMoney);
      this.#lottoCreator.purchaseMoney = purchaseMoney;
      this.#lottoPurchaseInputView.disableForm();

      this.#lottoCreator.createLottoList();
      this.#lottoPurchaseResultView.render(
        this.#lottoCreator.purchaseMoney / LOTTO.COST_UNIT,
        this.#lottoCreator.lottoList
      );

      this.#lottoWinningNumberInputView.render();
      this.#submitLottoWinningNumberInputView();
    } catch (err) {
      alert(err.message);
      this.#lottoPurchaseInputView.reset();
    }
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

    try {
      LottoController.validateLottoWinningNumbers(
        lottoWinningNumbers,
        LOTTO.MIN_DIGIT,
        LOTTO.MAX_DIGIT
      );
      LottoController.validateLottoWinningBonusNumber({
        lottoWinningNumbers,
        lottoWinningBonusNumber,
        min: LOTTO.MIN_DIGIT,
        max: LOTTO.MAX_DIGIT,
      });

      const lottoMatchResult = this.#lottoResultManager.calcLottoMatchingResult(
        lottoWinningNumbers,
        lottoWinningBonusNumber,
        this.#lottoCreator.lottoList
      );
      const profit = this.#lottoResultManager.calcProfit(
        this.#lottoCreator.purchaseMoney,
        lottoMatchResult
      );

      this.#lottoMatchResultModalView.render(lottoMatchResult, profit);
    } catch (err) {
      alert(err.message);
      this.#lottoWinningNumberInputView.reset();
    }
  }

  static validatePurchaseMoney(purchaseMoney) {
    if (
      isDividedByThousand(purchaseMoney) &&
      !isEmptyValue(purchaseMoney) &&
      isPositiveValue(purchaseMoney)
    ) {
      return true;
    }

    throw new Error(ERROR_MESSAGE.IS_NOT_VALID_PURCHASE_MONEY);
  }

  static validateLottoWinningNumbers(lottoWinningNumbers, min, max) {
    if (
      isNotDuplicateNumberExistInArray(lottoWinningNumbers) &&
      isAllNumberInRange(lottoWinningNumbers, min, max)
    )
      return true;

    throw new Error(ERROR_MESSAGE.IS_NOT_VALID_LOTTO_WINNING_NUMBERS);
  }

  static validateLottoWinningBonusNumber({
    lottoWinningNumbers,
    lottoWinningBonusNumber,
    min,
    max,
  }) {
    if (
      isNumberInRange(lottoWinningBonusNumber, min, max) &&
      isNotIncludeSameNumber(lottoWinningNumbers, lottoWinningBonusNumber)
    ) {
      return true;
    }

    throw new Error(ERROR_MESSAGE.IS_NOT_VALID_LOTTO_WINNING_BONUS_NUMBER);
  }
}
