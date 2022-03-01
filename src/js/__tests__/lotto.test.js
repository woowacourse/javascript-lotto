import { computeLottoRateOfReturn } from '../core/computeLottoWinningValue.js';
import Lotto from '../core/lotto.js';
import {
  calculateGameCount,
  isOverlapLottoNumber,
} from '../core/makeLottoList.js';

describe('로또와 관련된 테스트를 진행하는 곳', () => {
  test('입력 금액에 맞게 로또를 생성되는지 확인한다', () => {
    const input = 2000;
    expect(calculateGameCount(input)).toBe(2);
  });

  test('로또 번호를 생성할 때에는 중복값이 없도록 한다.', () => {
    const overLapInputNumberList = [
      [1, 2, 3, 4, 4, 5],
      [1, 2, 33, 33, 4, 5],
    ];
    overLapInputNumberList.forEach(lottoNumbers => {
      expect(isOverlapLottoNumber(lottoNumbers)).toBe(false);
    });

    const positiveInputNumberList = [
      [1, 2, 3, 4, 5, 6],
      [2, 15, 36, 42, 1, 23],
    ];
    positiveInputNumberList.forEach(lottoNumbers => {
      expect(isOverlapLottoNumber(lottoNumbers)).toBe(true);
    });
  });

  test('로또 수익율이 올바르게 계산이 되는지 확인한다.', () => {
    const lastLottoNumberList = [[1, 2, 3, 4, 5, 6], 7];
    const currentLottoNumbers = [
      new Lotto([1, 2, 3, 8, 9, 10]),
      new Lotto([1, 2, 3, 8, 9, 10]),
      new Lotto([1, 2, 3, 8, 9, 10]),
      new Lotto([1, 2, 3, 8, 9, 10]),
      new Lotto([1, 2, 3, 8, 9, 10]),
    ];
    expect(
      computeLottoRateOfReturn(currentLottoNumbers, lastLottoNumberList),
    ).toBe(500);
  });
});
