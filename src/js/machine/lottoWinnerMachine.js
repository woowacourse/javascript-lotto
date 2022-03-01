import { LOTTO_NUMBER_RANGE } from '../constants/constants';
import { isNumberInRange } from '../utils/utils';

class LottoWinnerMachine {
  constructor() {
    this.numbers = [];
    this.bonus = null;
    this.deliverMessage = () => {};
  }

  setWinnerNumbers({ numbers, bonus }) {
    if (!this.#isFullWinnerNumberInput({ numbers, bonus })) {
      throw new Error('6개의 당첨 번호와 보너스 번호를 입력해야 합니다.');
    }

    const allNumbers = [...numbers, bonus].map((numberString) => Number(numberString));
    if (!this.#isUniqueInput(allNumbers)) {
      throw new Error('6개의 당첨 번호와 보너스 번호 중에 중복된 숫자가 있습니다.');
    }
    if (!this.#isValidLottoNumberArray(allNumbers)) {
      throw new Error('6개의 당첨 번호와 보너스 번호는 모두 1-45 사이의 자연수여야 합니다.');
    }
  }

  assignMessenger(deliverMessage) {
    this.deliverMessage = deliverMessage;
  }

  #isFullWinnerNumberInput({ numbers, bonus }) {
    return numbers.length === 6 && bonus !== undefined;
  }

  #isUniqueInput(allNumbers) {
    return new Set(allNumbers).size === allNumbers.length;
  }

  #isValidLottoNumberArray(allNumbers) {
    return allNumbers.every((number) => this.#isValidLottoNumber(number));
  }

  #isValidLottoNumber(number) {
    return (
      isNumberInRange({ number, max: LOTTO_NUMBER_RANGE.MAX, min: LOTTO_NUMBER_RANGE.MIN }) &&
      Number.isInteger(number)
    );
  }
}

export default LottoWinnerMachine;
