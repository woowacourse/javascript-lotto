import OPTIONS from '../constant/Options.js';
import { validate2, validations } from '../util/validation.js';

const resultFormEventListener = (event) => {
  event.preventDefault();

  const inputs = [...document.querySelectorAll('.result-form__number-input')].map((element) => {
    return Number(element.value);
  });

  const winningNumbers = inputs.slice(0, -1);
  const bonusNumber = inputs[6];

  validateLottoNumbers(winningNumbers, bonusNumber);

  return [winningNumbers, bonusNumber];
};

const validateLottoNumbers = (lottoNumbers, bonusNumber = null) => {
  const name = '로또 번호';

  validate2(validations.isUnique, lottoNumbers, name);
  validate2(validations.hasLength, lottoNumbers, OPTIONS.LOTTO.count, name);

  lottoNumbers.forEach((number) => {
    validate2(validations.isInteger, number, name);
    validate2(
      validations.isInRange,
      number,
      OPTIONS.LOTTO.minNumber,
      OPTIONS.LOTTO.maxNumber,
      name
    );
  });

  if (bonusNumber) {
    validateBounsNumber(lottoNumbers, bonusNumber);
  }
};

const validateBounsNumber = (lottoNumbers, bonusNumber) => {
  const name = '보너스 번호';

  validate2(validations.isInteger, bonusNumber, name);
  validate2(
    validations.isInRange,
    bonusNumber,
    OPTIONS.LOTTO.minNumber,
    OPTIONS.LOTTO.maxNumber,
    name
  );
  validate2(validations.isUnique, [...lottoNumbers, bonusNumber], name);
};

export default resultFormEventListener;
