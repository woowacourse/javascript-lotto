import _isNumber from '../src/Validation/validateNumber.js';
import ERROR_MESSAGE from '../src/Validation/validateNumber.js';
import _isInteger from '../src/Validation/validateNumber.js';
import _isPositive from '../src/Validation/validateNumber.js';

describe('인풋 validation 테스트', () => {
  describe('_isNumber Validation test', () => {
    it(`isNumber는 숫자가 아닐때 ${ERROR_MESSAGE.notANumber}에러를 던져야 한다.`, () => {
      const testCase = 'a';
      expect(() => {
        _isNumber(testCase);
      }).toThrow(ERROR_MESSAGE.notANumber);
    });
    it('isNumber는 숫자일 때 그 값을 그대로 반환한다.', () => {
      const testCase = '1';
      expect(_isNumber(testCase)).toBe(1);
    });
  });
  describe('_isInteger Validation test', () => {
    it(`isInteger는 정수가 아닐 때 ${ERROR_MESSAGE.notInteger}에러를 던져야 한다.`, () => {
      const testCase = '1.5';
      expect(() => {
        _isInteger(testCase);
      }).toThrow(ERROR_MESSAGE.notInteger);
    });

    it('isInteger는 정수일 때 그 값을 그대로 반환한다.', () => {
      const testCase = '1';
      expect(_isInteger(testCase)).toBe(1);
    });
  });
  describe('_isPositive Validation test', () => {
    it(`_isPositive는 양수가 아닐 때 ${ERROR_MESSAGE.notPositive}에러를 던져야 한다.`, () => {
      const testCase = '-1';
      expect(() => {
        _isPositive(testCase);
      }).toThrow(ERROR_MESSAGE.notPositive);
    });
    it('_isPositive는 양수일 때 그 값을 그대로 반환한다.', () => {
      const testCase = '1';
      expect(_isPositive(testCase)).toBe(1);
    });
    it(`_isPositive는 0일 때 ${ERROR_MESSAGE.notPositive}에러를 던져야 한다.`, () => {
      const testCase = '0';
      expect(() => {
        _isPositive(testCase);
      }).toThrow(ERROR_MESSAGE.notPositive);
    });
  });
});
