import ValidatorImpl from '../ValidatorImpl/index.js';
import LottoCountCalculator from '../CalculatorImpl/LottoCountCalculator.js';
import RemainFareCalculator from '../CalculatorImpl/RemainFareCalculator.js';
import RateOfReturnCalculator from '../CalculatorImpl/RateOfReturnCalculator.js';
import LottoCollectionImpl from '../LottoCollection/LottoCollectionImpl.js';
import LottosViewImpl from '../View/LottosViewImpl.js';
import MatchResultViewImpl from '../View/MatchResultViewImpl.js';
import ValidationError from '../ValidationError/index.js';
import { extractNumber } from '../utils/index.js';
import { LOTTO_RULES, ERROR_MESSAGE } from '../constant/index.js';

const validator = new ValidatorImpl();
const lottoCollection = new LottoCollectionImpl();
const lottosView = new LottosViewImpl();
const matchResultView = new MatchResultViewImpl();

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

export const toggleLottosView = () => {
  lottosView.toggleContainer();
};

export const writingWinningNumber = (e) => {
  e.currentTarget.value = extractNumber(
    e.currentTarget.value.slice(0, LOTTO_RULES.NUMBER_MAX_LENGTH),
  );

  if (e.currentTarget.value.length >= LOTTO_RULES.NUMBER_MAX_LENGTH) {
    matchResultView.moveTabToEmptyInput();
  }
};

const deriveMatchResult = (winningNumber) => {
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

  matchResultView.render(deriveMatchResult(winningNumber));
  matchResultView.onModal();
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
