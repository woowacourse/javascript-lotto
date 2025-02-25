import { KEY } from '../constants/CONFIGURATIONS';
import { LottoNumbersValidator, validateDuplicate } from '../validators/LottoNumbersValidator';

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  get numbers() {
    return this.#numbers;
  }

  #validate(numbers) {
    LottoNumbersValidator.validate(KEY.LOTTO_NUMBERS, numbers);
    validateDuplicate(numbers);
  }
}

export default Lotto;
