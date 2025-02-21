import ERROR_MESSAGE from '../src/settings/ErrorMessage.js';
import Lotto from '../src/model/Lotto.js';
import validateNumberInRange from '../src/Validation/validateNumberInRange.js';

describe('Lotto class test', () => {
  it('로또를 생성했을 때 6개의 번호가 아닐 경우 에러를 던진다.', () => {
    const testCase = [1, 2, 3, 4, 5];
    expect(() => {
      new Lotto(testCase);
    }).toThrow(ERROR_MESSAGE.notSixNumbers);
  });
  it('로또를 생성했을 때 6개의 번호를 집어넣으면, 그 숫자를 반환한다.', () => {
    const testCase = [1, 2, 3, 4, 5, 6];
    expect(new Lotto(testCase).numbers).toBe(testCase);
  });

  it('로또를 생성했을 때 중복된 숫자가 포함된 경우 에러를 던진다.', () => {
    const testCase = [1, 2, 3, 4, 5, 5];
    expect(() => {
      new Lotto(testCase);
    }).toThrow(ERROR_MESSAGE.duplicatedNumbers);
  });
  it('로또 생성했을 때 1-45 외의 숫자가 들어갔을때, 에러를 던진다', () => {
    const testCase = [45, 1, 2, 3, 4, 46];
    expect(() => {
      validateNumberInRange(testCase);
    }).toThrow(ERROR_MESSAGE.numberOutOfRange);
  });
});
