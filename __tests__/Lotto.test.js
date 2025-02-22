import ERROR_MESSAGE from '../src/constants/ErrorMessage.js';
import Lotto from '../src/model/Lotto.js';
import checkNumberInRange from '../src/Validation/checkNumberInRange.js';

describe('Lotto class test', () => {
  it('로또를 생성했을 때 6개의 번호가 아닐 경우 에러를 던진다.', () => {
    const testCase = [1, 2, 3, 4, 5];
    expect(() => {
      new Lotto(testCase);
    }).toThrow(ERROR_MESSAGE.notSixNumbers);
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
      checkNumberInRange(testCase);
    }).toThrow(ERROR_MESSAGE.numberOutOfRange);
  });

  it('유효한 6개의 숫자로 로또 객체가 생성되면 그대로 저장된다.', () => {
    const testCase = [1, 2, 3, 4, 5, 6];
    expect(new Lotto(testCase).numbers).toBe(testCase);
  });
});
