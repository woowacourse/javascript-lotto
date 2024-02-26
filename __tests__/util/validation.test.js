import { validations, validate } from '../../src/util/validation.js';

describe('유효성 검사 테스트', () => {
  test('isInteger 함수는 정수일 경우 true를 반환한다.', () => {
    expect(validations.isInteger.function(1)).toBe(true);
  });

  test('isInteger 함수는 정수가 아닐 경우 false를 반환한다.', () => {
    expect(validations.isInteger.function(1.1)).toBe(false);
  });

  test('isAtLeast 함수는 특정 값 이상일 경우 true를 반환한다.', () => {
    expect(validations.isAtLeast.function(5, 3)).toBe(true);
  });

  test('isAtLeast 함수는 특정 값 미만일 경우 false를 반환한다.', () => {
    expect(validations.isAtLeast.function(2, 3)).toBe(false);
  });

  test('hasLength 함수는 길이가 일치할 경우 true를 반환한다.', () => {
    expect(validations.hasLength.function([1, 2, 3], 3)).toBe(true);
  });

  test('hasLength 함수는 길이가 일치하지 않을 경우 false를 반환한다.', () => {
    expect(validations.hasLength.function([1, 2], 3)).toBe(false);
  });

  test('isInRange 함수는 범위 내에 있을 경우 true를 반환한다.', () => {
    expect(validations.isInRange.function(5, 1, 10)).toBe(true);
  });

  test('isInRange 함수는 범위 밖에 있을 경우 false를 반환한다.', () => {
    expect(validations.isInRange.function(0, 1, 10)).toBe(false);
  });

  test('isUnique 함수는 모든 요소가 유일할 경우 true를 반환한다.', () => {
    expect(validations.isUnique.function([1, 2, 3])).toBe(true);
  });

  test('isUnique 함수는 중복 요소가 있을 경우 false를 반환한다.', () => {
    expect(validations.isUnique.function([1, 2, 2])).toBe(false);
  });

  test('validate 함수는 유효성 검사에 실패하면 에러를 발생시킨다.', () => {
    expect(() => validate(validations.isInteger, 1.1, 'number')).toThrow();
  });

  test('validate 함수는 유효성 검사에 성공하면 에러를 발생시키지 않는다.', () => {
    expect(() => validate(validations.isInteger, 1, 'number')).not.toThrow();
  });
});
