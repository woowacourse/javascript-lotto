import ERROR_MESSAGE from '../src/settings/ErrorMessage.js';
import Lotto from '../src/model/Lotto.js';
import checkBonusNumber from '../src/util/checkBonusNumber.js';

describe('보너스 숫자 validation 테스트', () => {
  it('보너스 숫자가 중복된 경우 에러를 던진다.', () => {
    const bonusNumber = 1;
    expect(() => {
      const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
      checkBonusNumber(lotto, bonusNumber);
    }).toThrow(ERROR_MESSAGE.duplicatedNumbers);
  });
});
