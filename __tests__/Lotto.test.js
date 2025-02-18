import ERROR_MESSAGE from '../src/settings/ErrorMessage.js';
import Lotto from '../src/model/Lotto.js';
describe('Lotto class test', () => {
  it('로또를 생성했을 때 6개의 번호가 아닐 경우 에러를 던진다.', () => {
    const testCase = [1, 2, 3, 4, 5];
    expect(() => {
      new Lotto(testCase);
    }).toThrow(ERROR_MESSAGE.notSixNumbers);
  });
  it('로또를 생성했을 때 6개의 번호일때는 숫자를 가진다.', () => {
    const testCase = [1, 2, 3, 4, 5, 6];
    expect(new Lotto(testCase).numbers).toBe(testCase);
  });
});
