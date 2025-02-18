import isNumber from '../src/util/isNumber.js';
import ERROR_MESSAGE from '../src/settings/ErrorMessage.js';
import isInteger from '../src/util/isInteger.js';
import isPositive from '../src/util/isPositive.js';

describe('인풋 validation 테스트', () => {
  describe('isNumber Validation test', () => {
    it('isNumber는 숫자가 아닐때 에러를 던져야 한다.', () => {
      const testCase = 'a';
      expect(() => {
        isNumber(testCase);
      }).toThrow(ERROR_MESSAGE.notANumber);
    });
    it('isNumber는 숫자일 때 그 값을 그대로 반환한다.', () => {
      const testCase = '1';
      expect(isNumber(testCase)).toBe(1);
    });
  });
  describe('isInteger Validation test', () => {
    it('isInteger는 정수가 아닐 때 에러를 던져야 한다.', () => {
      const testCase = '1.5';
      expect(() => {
        isInteger(testCase);
      }).toThrow(ERROR_MESSAGE.notInteger);
    });

    it('isInteger는 정수일 때 그 값을 그대로 반환한다.', () => {
      const testCase = '1';
      expect(isInteger(testCase)).toBe(1);
    });
  });
  describe('isPositive Validation test', () => {
    it('isPositive는 양수가 아닐 때 에러를 던져야 한다.', () => {
      const testCase = '-1';
      expect(() => {
        isPositive(testCase);
      }).toThrow(ERROR_MESSAGE.notPositive);
    });
    it('isPositive는 숫자일 때 그 값을 그대로 반환한다.', () => {
      const testCase = '1';
      expect(isPositive(testCase)).toBe(1);
    });
  });
});
