import CONDITION from '../src/constant/Condition.js';
import ERROR from '../src/constant/Error.js';
import LottoNumber from '../src/domain/entity/LottoNumber';

class WinningLotto {
  #winningNumbers;

  constructor(winningNumbersString) {
    const winningNumberStringArray = winningNumbersString.split(',');
    this.#validateLength(winningNumberStringArray);
    this.#winningNumbers = this.#parse(winningNumberStringArray);
  }

  getNumbers() {
    return this.#winningNumbers.map(lotto => lotto.getNumber());
  }

  #validateLength(winningNumberStringArray) {
    if (winningNumberStringArray.length !== CONDITION.countOfNumberInTicket) {
      throw new Error(ERROR.countOfWinningNumbers);
    }
  }

  #parse(winningNumberStringArray) {
    return winningNumberStringArray.map(numStr => new LottoNumber(numStr));
  }
}
describe('정답 로또 테스트', () => {
  test('성공 케이스', () => {
    const WINNING_LOTTO_NUMBERS_STRING = '1,2,3,4,5,6';
    const LOTTO_NUMBERS = [1, 2, 3, 4, 5, 6];

    expect(new WinningLotto(WINNING_LOTTO_NUMBERS_STRING).getNumbers()).toEqual(
      LOTTO_NUMBERS,
    );
  });

  test('6개가 아닌 숫자들을 입력받았을 때, 에러를 발생시킨다.', () => {
    const WINNING_LOTTO_NUMBERS_STRING = '1,2,3,4,5,6,7';

    expect(() => new WinningLotto(WINNING_LOTTO_NUMBERS_STRING)).toThrow(
      '[Error]',
    );
  });

});
