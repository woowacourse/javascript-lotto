export const LOTTO_NUMBER_RANGE = Object.freeze({
  MIN: 1,
  MAX: 45,
});

export const LOTTO_LENGTH = 6;

const ERROR_MESSAGES = Object.freeze({
  OUT_OF_RANGE: `${LOTTO_NUMBER_RANGE.MIN} 이상, ${LOTTO_NUMBER_RANGE.MAX} 이하의 숫자여야합니다.`,
  DUPLICATE: '중복된 숫자가 존재합니다.',
  INVALID_LENGTH: '로또의 숫자는 6개여야합니다.',
});

export default class LottoNumber {
  #numbers;

  constructor(numbers) {
    this.#numbers = numbers.sort((a, b) => a - b);
    this.#validLottoNumbers();
  }

  #validLottoNumbers() {
    this.#numbers.forEach((number) => {
      this.#validInRange(number);
    });
    // TODO: 숫자형인지 검사
    this.#validDuplicate();
    this.#validLength();
  }

  #validInRange(number) {
    if (number < LOTTO_NUMBER_RANGE.MIN || number > LOTTO_NUMBER_RANGE.MAX) {
      throw new Error(ERROR_MESSAGES.OUT_OF_RANGE);
    }
  }

  validInRangeWrapper(number) {
    return this.#validInRange(number);
  }

  #validDuplicate() {
    if (new Set([...this.#numbers]).size !== this.#numbers.length) {
      throw new Error(ERROR_MESSAGES.DUPLICATE);
    }
  }

  #validLength() {
    if (this.#numbers.length !== LOTTO_LENGTH) {
      throw new Error(ERROR_MESSAGES.INVALID_LENGTH);
    }
  }

  getLottoNumbers() {
    return [...this.#numbers];
  }
}
