import { KEY } from '../constants/Configurations.js';
import {
  LottoNumbersValidator,
  validateDuplicate,
} from '../validators/LottoNumbersValidator.js';

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
