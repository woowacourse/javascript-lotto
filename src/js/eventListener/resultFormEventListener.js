import OPTIONS from '../constant/Options.js';
import { validate2, validations } from '../util/validation.js';

const winningsFormSubmitListener = (event) => {
  event.preventDefault();

  const form = event.target;
  const winningNumbers = Array.from(form.elements['input-winning-list'], (element) => {
    return Number(element.value);
  });
  const bonusNumber = Number(form.elements['input-bonus'].value);

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

export default winningsFormSubmitListener;
