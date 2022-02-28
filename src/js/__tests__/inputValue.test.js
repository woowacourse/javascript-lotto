import { isValueDivideThousand } from '../core/checkLottoPriceInputValue.js';
import {
  isValueTypeNumber,
  isPositiveNumber,
} from '../modules/checkInputValue.js';
import {
  IS_OVERLAP_LOTTO_NUMBER_ERROR,
  NOT_DIVIDE_THOUSAND_ERROR,
  NOT_NUMBER_IN_RANGE,
  NOT_NUMBER_TYPE_ERROR,
  NOT_POSITIVE_NUMBER_ERROR,
} from '../constants/errorMessage.js';
import {
  checkLastLottoNumbersOverlap,
  checkLastLottoNumbersPositive,
  checkLastLottoNumbersType,
  checkLastLottoNumbersInRange,
} from '../core/checkLastLottoNumberInput.js';

describe('사용자가 입력한 로또 금액과 지난 주 당첨 번호 입력값에 대한 테스트', () => {
  test('사용자가 입력한 로또 금액이 Number 타입인지 확인한다', () => {
    const value = ['', 'ss', '%@%'];
    value.forEach(item => {
      expect(() => isValueTypeNumber(item)).toThrow(NOT_NUMBER_TYPE_ERROR);
    });
  });
  test('사용자가 입력한 로또 금액이 양수 값인지 확인한다', () => {
    const value = [0, -1000];
    value.forEach(item => {
      expect(() => isPositiveNumber(item)).toThrow(NOT_POSITIVE_NUMBER_ERROR);
    });
  });
  test('사용자가 입력한 로또 금액이 1000원 단위의 금액인지 확인한다', () => {
    const value = [1050, 1000.45];
    value.forEach(item => {
      expect(() => isValueDivideThousand(item)).toThrow(
        NOT_DIVIDE_THOUSAND_ERROR,
      );
    });
  });
  test('사용자가 입력한 지난 주 로또 당첨 번호들이 Number 타입인지 확인한다.', () => {
    const lastLottoNumbers = [
      [0, 1, 2, 3, 4, 5, 6],
      ['', 's', 'a', 'b', 1, 2, 3],
    ];
    lastLottoNumbers.forEach(numbers => {
      expect(() => checkLastLottoNumbersType(numbers)).toThrow(
        NOT_NUMBER_TYPE_ERROR,
      );
    });
  });
  test('사용자가 입력한 지난 주 로또 당첨 번호들이 양수 값인지 확인한다.', () => {
    const lastLottoNumbers = [
      [-1, 0, 1, 2, 3, 4, 5, 6],
      [1, 2, 3, 4, 5, -1, -2],
    ];
    lastLottoNumbers.forEach(numbers => {
      expect(() => checkLastLottoNumbersPositive(numbers)).toThrow(
        NOT_POSITIVE_NUMBER_ERROR,
      );
    });
  });
  test('사용자가 입력한 지난주 로또 당첨 번호가 1~45 사이의 숫자인지 확인한다.', () => {
    const lottoNumbers = [
      [46, 73, 0, 1, 2, 3, 4],
      [1, 2, 3, 4, 46, 123, 5],
    ];
    lottoNumbers.forEach(numbers => {
      expect(() => checkLastLottoNumbersInRange(numbers)).toThrow(
        NOT_NUMBER_IN_RANGE,
      );
    });
  });
  test('사용자가 입력한 지난주 로또 당첨 번호가 중복되지 않는지 확인한다.', () => {
    const overlapNumbers = [
      [1, 1, 3, 4, 5, 6, 8],
      [17, 17, 45, 45, 1, 2, 7],
    ];
    overlapNumbers.forEach(lottoNumbers => {
      expect(() => checkLastLottoNumbersOverlap(lottoNumbers)).toThrow(
        IS_OVERLAP_LOTTO_NUMBER_ERROR,
      );
    });
  });
});
