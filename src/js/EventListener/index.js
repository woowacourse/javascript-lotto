import ValidatorImpl from '../ValidatorImpl/index.js';
import LottoCountCalculator from '../CalculatorImpl/LottoCountCalculator.js';
import RemainFareCalculator from '../CalculatorImpl/RemainFareCalculator.js';
import LottoCollectionImpl from '../LottoCollection/LottoCollectionImpl.js';
import LottosView from '../View/LottosView.js';
import MatchResultView from '../View/MatchResultView.js';
import ValidationError from '../ValidatorImpl/ValidationError.js';
import { extractNumber } from '../utils/index.js';
import { LOTTO_RULES } from '../constant/index.js';

const validator = new ValidatorImpl();
const lottoCollection = new LottoCollectionImpl();
const lottosView = new LottosView();
const matchResultView = new MatchResultView();

export const onSubmitFareForm = (e) => {
  e.preventDefault();

  try {
    const inputedFare = lottosView.getInputValue();

    validator.validateFare(inputedFare);
    lottoCollection.resetLottos();
    lottoCollection.createLottos(new LottoCountCalculator(inputedFare).execute());
    lottosView.render(lottoCollection.getLottos());
    lottosView.setInputValue(new RemainFareCalculator(inputedFare).execute());
  } catch (error) {
    if (error instanceof ValidationError) {
      error.handling();
      return;
    }

    throw error;
  }
};

export const onChangeLottoViewerController = () => {
  lottosView.toggleContainer();
};

const isFilledLottoNumber = (lottoNumber) => lottoNumber.length >= LOTTO_RULES.NUMBER_MAX_LENGTH;

export const onKeyUpLottoNumbers = (e) => {
  e.currentTarget.value = extractNumber(
    e.currentTarget.value.slice(0, LOTTO_RULES.NUMBER_MAX_LENGTH),
  );

  if (isFilledLottoNumber(e.currentTarget.value)) {
    matchResultView.tabNextInput(Number(e.currentTarget.dataset.index));
  }
};
