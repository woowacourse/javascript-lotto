export const LOTTO_NUMBER_RANGE = Object.freeze({
  MIN: 1,
  MAX: 45,
});

export const LOTTO_LENGTH = 6;

const ERROR_MESSAGES = Object.freeze({
  OUT_OF_RANGE: `${LOTTO_NUMBER_RANGE.MIN} 이상, ${LOTTO_NUMBER_RANGE.MAX} 이하의 숫자여야합니다.`,
  DUPLICATE: '중복된 숫자가 존재합니다.',
  INVALID_LENGTH: '로또의 숫자는 6개여야합니다.',
  NOT_NUMBER: '숫자만 입력해주세요.',
});

export default class LottoNumber {
  #numbers;

  constructor(numbers) {
    this.#numbers = numbers.sort((a, b) => a - b);
    this.#validateLottoNumbers();
  }

  #validateLottoNumbers() {
    this.#validateLength();
    this.#validateDuplicate();
    this.#numbers.forEach((number) => {
      this.#validateEachNumber(number);
    });
  }

  #validateEachNumber(number) {
    if (Number.isNaN(number)) {
      throw new Error(ERROR_MESSAGES.NOT_NUMBER);
    }
    if (number < LOTTO_NUMBER_RANGE.MIN || number > LOTTO_NUMBER_RANGE.MAX) {
      throw new Error(ERROR_MESSAGES.OUT_OF_RANGE);
    }
  }

  validateInRangeProtected(number) {
    return this.#validateEachNumber(number);
  }

  #validateDuplicate() {
    if (new Set(this.#numbers).size !== this.#numbers.length) {
      throw new Error(ERROR_MESSAGES.DUPLICATE);
    }
  }

  #validateLength() {
    if (this.#numbers.length !== LOTTO_LENGTH) {
      throw new Error(ERROR_MESSAGES.INVALID_LENGTH);
    }
  }

  getLottoNumbers() {
    return [...this.#numbers];
  }
}
