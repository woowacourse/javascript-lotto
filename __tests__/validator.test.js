import Validator from '../src/util/Validator';

describe('숫자가 자연수가 맞는지 확인하는 기능', () => {
  test.each(['1004', '1', '+3000'])('%s은(는) true를 반환한다', (input) => {
    expect(Validator.isPositiveInteger(input)).toBeTruthy();
  });

  test.each([
    ['0x123', '십진법이 아님'],
    ['1000.4', 'floating point임'],
    ['-1000', '음수임'],
    ['타우린', '문자열임'],
    ['0', '자연수가 아님'],
  ])('%s은(는) false를 반환한다(%s)', (input) => {
    expect(Validator.isPositiveInteger(input)).toBeFalsy();
  });

  test('Number 자료형 범위 초과', () => {
    expect(Validator.isSafeNumber('123456789011121314')).toBeFalsy();
  });

  test('Number 자료형 범위 안', () => {
    expect(Validator.isSafeNumber('1234')).toBeTruthy();
  });
});
