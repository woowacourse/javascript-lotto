import ERROR_MESSAGE from '../src/settings/ErrorMessage.js';
import Lotto from '../src/model/Lotto.js';
import checkBonusNumber from '../src/util/checkBonusNumber.js';
import checkNumberInRange from '../src/util/checkNumberInRange.js';

describe('보너스 숫자 validation 테스트', () => {
  it('보너스 숫자가 중복된 경우 에러를 던진다.', () => {
    const bonusNumber = 1;
    expect(() => {
      const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
      checkBonusNumber(lotto, bonusNumber);
    }).toThrow(ERROR_MESSAGE.duplicatedNumbers);
  });

  it('보너스 번호가 1-45 외의 숫자가 들어갔을때, 에러를 던진다', () => {
    const testCase = [46];
    expect(() => {
      checkNumberInRange(testCase);
    }).toThrow(ERROR_MESSAGE.numberOutOfRange);
  });
});
