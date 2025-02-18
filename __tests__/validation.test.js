import isNumber from '../src/util/isNumber.js';

describe('인풋 validation 테스트', () => {
  it('isNumber는 숫자가 아닐때 에러를 던져야 한다.', () => {
    const testCase = 'a';
    expect(() => {
      isNumber(testCase);
    }).toThrow();
  });
  it('isNumber는 숫자가 아닐때 에러를 던져야 한다.', () => {
    const testCase = '1';
    expect(isNumber(testCase)).toBe(1);
  });
});
