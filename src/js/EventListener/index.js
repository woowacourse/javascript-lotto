import ValidatorImpl from '../ValidatorImpl/index.js';
import LottoCountCalculator from '../CalculatorImpl/LottoCountCalculator.js';
import RemainFareCalculator from '../CalculatorImpl/RemainFareCalculator.js';
import LottoManagerImpl from '../LottoManager/LottoManagerImpl.js';
import LottosView from '../View/LottosView.js';
import { extractNumber } from '../utils/index.js';

const validator = new ValidatorImpl();
const lottoManager = new LottoManagerImpl();
const lottosView = new LottosView();

export const onSubmitFareForm = (e) => {
  e.preventDefault();

  try {
    const inputedFare = lottosView.getInputValue();

    validator.validateFare(inputedFare);
    lottoManager.resetLottos();
    lottoManager.createLottos(new LottoCountCalculator(inputedFare).execute());
    lottosView.render(lottoManager.getLottos());
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
