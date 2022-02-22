import { LOTTO_PRICE } from '../constants/constant.js';

export const isValueTypeNumber = value => {
  return typeof value === Number;
};

export const isValuePositiveNumber = value => {
  return value > 0;
};

export const isValueDivideThousand = value => {
  return value % LOTTO_PRICE === 0;
};

describe('사용자의 입력값을 테스트', () => {
  test('사용자가 입력한 로또 금액값이 Number 타입인지 확인한다', () => {
    const value = ['', 'ss'];
    value.forEach(item => {
      expect(isValueTypeNumber(item)).toBe(false);
    });
  });
  test('사용자가 입력한 로또 금액값이 양수 값인지 확인한다', () => {
    const value = [0, -1000];
    value.forEach(item => {
      expect(isValuePositiveNumber(item)).toBe(false);
    });
  });
  test('사용자가 입력한 로또 금액값이 1000원 단위의 금액인지 확인한다', () => {
    const value = [1050, 1000.45];
    value.forEach(item => {
      expect(isValueDivideThousand(item)).toBe(false);
    });
  });
});
