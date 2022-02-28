import {
  isValueTypeNumber,
  isPositiveNumber,
  isValueDivideThousand,
} from '../core/checkInputValue.js';
import { isOverlapLottoNumber } from '../core/makeLottoList.js';

function checkNumberInRange(num) {
  if (num <= 45 && num >= 1) {
    return true;
  }
  return false;
}

describe('사용자가 입력한 로또 금액과 지난 주 당첨 번호 입력값에 대한 테스트', () => {
  test('사용자가 입력한 값이 Number 타입인지 확인한다', () => {
    const value = ['', 'ss', '%@%'];
    value.forEach(item => {
      expect(isValueTypeNumber(item)).toBe(false);
    });
  });
  test('사용자가 입력한 값이 양수 값인지 확인한다', () => {
    const value = [0, -1000];
    value.forEach(item => {
      expect(isPositiveNumber(item)).toBe(false);
    });
  });
  test('사용자가 입력한 로또 금액값이 1000원 단위의 금액인지 확인한다', () => {
    const value = [1050, 1000.45];
    value.forEach(item => {
      expect(isValueDivideThousand(item)).toBe(false);
    });
  });
  test('사용자가 입력한 지난주 로또 당첨 번호가 1~45 사이의 숫자인지 확인한다.', () => {
    const lottoNumbers = [46, 73, 0];
    lottoNumbers.forEach(num => {
      expect(checkNumberInRange(num)).toBe(false);
    });
  });
  test('사용자가 입력한 지난주 로또 당첨 번호가 중복되지 않는지 확인한다.', () => {
    const overlapNumbers = [
      [1, 1, 3, 4, 5, 6],
      [17, 17, 45, 45, 1, 2],
    ];
    overlapNumbers.forEach(lottoNumbers => {
      expect(isOverlapLottoNumber(lottoNumbers)).toBe(false);
    });
  });
});
