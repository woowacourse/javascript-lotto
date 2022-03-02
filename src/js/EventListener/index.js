import ValidatorImpl from '../ValidatorImpl/index.js';
import LottoCountCalculator from '../CalculatorImpl/LottoCountCalculator.js';
import RemainFareCalculator from '../CalculatorImpl/RemainFareCalculator.js';
import LottoCollectionImpl from '../LottoCollection/LottoCollectionImpl.js';
import LottosView from '../View/LottosView.js';
import { extractNumber } from '../utils/index.js';

const validator = new ValidatorImpl();
const lottoCollection = new LottoCollectionImpl();
const lottosView = new LottosView();

export const onSubmitFareForm = (e) => {
  e.preventDefault();

  try {
    const inputedFare = lottosView.getInputValue();

    validator.validateFare(inputedFare);
    lottoCollection.resetLottos();
    lottoCollection.createLottos(new LottoCountCalculator(inputedFare).execute());
    lottosView.render(lottoCollection.getLottos());
    lottosView.setInputValue(new RemainFareCalculator(inputedFare).execute());
  } catch ({ message }) {
    alert(message);
  }
};

export const onChangeLottoViewerController = () => {
  lottosView.toggleContainer();
};

export const onKeyUpLottoNumbers = (e) => {
  e.currentTarget.value = extractNumber(e.currentTarget.value.slice(0, 2));
};
