import ValidatorImpl from '../ValidatorImpl/index.js';
import LottoCountCalculator from '../CalculatorImpl/LottoCountCalculator.js';
import RemainFareCalculator from '../CalculatorImpl/RemainFareCalculator.js';
import RateOfReturnCalculator from '../CalculatorImpl/RateOfReturnCalculator.js';
import LottoCollectionImpl from '../LottoCollection/LottoCollectionImpl.js';
import LottosViewImpl from '../View/LottosViewImpl.js';
import MatchResultViewImpl from '../View/MatchResultViewImpl.js';
import ValidationError from '../ValidationError/index.js';
import { extractNumber, isEmpty, isNotNumber, isOutOfRanged } from '../utils/index.js';
import { LOTTO_RULES, ERROR_MESSAGE, ORDER_TO_FOCUS_ON_VIEW } from '../constant/index.js';

const validator = new ValidatorImpl();
const lottoCollection = new LottoCollectionImpl();
const lottosView = new LottosViewImpl();
const matchResultView = new MatchResultViewImpl();

const findInputFunctions = {
  [ORDER_TO_FOCUS_ON_VIEW.EMPTY_NUMBER]: ($input) =>
    $input.find(($numberInput) => isEmpty($numberInput.value)),
  [ORDER_TO_FOCUS_ON_VIEW.NOT_NUMBER]: ($input) =>
    $input.find(($numberInput) => isNotNumber($numberInput.value)),
  [ORDER_TO_FOCUS_ON_VIEW.OVERLAPPED_NUMBER]: ($input) => {
    const set = new Set();

    return $input.find(($numberInput) => {
      if (set.has($numberInput.value)) return true;

      set.add($numberInput.value);
      return false;
    });
  },
  [ORDER_TO_FOCUS_ON_VIEW.OUT_OF_RANGE_NUMBER]: ($input) =>
    $input.find(($numberInput) =>
      isOutOfRanged($numberInput.value, LOTTO_RULES.MIN_RANGE, LOTTO_RULES.MAX_RANGE),
    ),
};

const ENTER_KEY_CODE = 13;

const lottosViewRenderingObject = (fare) => ({
  lottos: lottoCollection.getLottos(),
  remainFare: new RemainFareCalculator(fare).execute(),
});

export const trySubmitFareForm = () => {
  const inputedFare = lottosView.getInputValue();

  validator.validateFare(inputedFare);
  lottoCollection.resetLottos();
  lottoCollection.createLottos(new LottoCountCalculator(inputedFare).execute());
  lottosView.render(lottosViewRenderingObject(inputedFare));
  matchResultView.show();
};

export const catchSubmitFareForm = (orderToView) => {
  if (orderToView === ORDER_TO_FOCUS_ON_VIEW.FARE) {
    lottosView.focusInput();
  }
};

export const toggleLottosView = () => {
  lottosView.toggleContainer();
};

const matchResultRenderingObject = (winningNumber) => {
  const matchResult = lottoCollection.matchResult(winningNumber.map(Number));
  const rateOfReturn = new RateOfReturnCalculator(
    lottoCollection.getLottos().length,
    matchResult,
  ).execute();

  return { matchResult, rateOfReturn };
};

export const tryClickConfirmResultButton = () => {
  if (lottoCollection.isEmpty()) {
    throw new ValidationError(ERROR_MESSAGE.EMPTY_OF_LOTTO);
  }

  const winningNumber = matchResultView.getInputValue();
  validator.validateWinningNumber(winningNumber);

  matchResultView.render(matchResultRenderingObject(winningNumber));
  matchResultView.onModal();
};

export const writingWinningNumber = (e) => {
  e.currentTarget.value = extractNumber(
    e.currentTarget.value.slice(0, LOTTO_RULES.NUMBER_MAX_LENGTH),
  );

  if (e.currentTarget.value.length >= LOTTO_RULES.NUMBER_MAX_LENGTH) {
    matchResultView.focusFindedInput(findInputFunctions[ORDER_TO_FOCUS_ON_VIEW.EMPTY_NUMBER]);
  }

  if (e.keyCode === ENTER_KEY_CODE) {
    tryClickConfirmResultButton();
  }
};

export const catchClickConfirmResultButton = (orderToView) => {
  matchResultView.focusFindedInput(findInputFunctions[orderToView]);
};

export const closeModal = () => {
  matchResultView.offModal();
};

export const restartApp = () => {
  lottoCollection.resetLottos();
  lottosView.setInputValue('');
  lottosView.resetView();
  matchResultView.setInputValue(['', '', '', '', '', '', '']);
  matchResultView.hide();
  matchResultView.offModal();
  lottosView.focusInput();
};
