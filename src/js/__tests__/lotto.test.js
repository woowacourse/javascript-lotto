/* eslint-disable max-lines-per-function */
/* eslint-disable no-undef */

import { ERROR_MESSAGE } from '../constants/errorMessage';
import { NUMBER } from '../constants/number';
import Lotto from '../models/Lotto';

describe('로또 모델 테스트', () => {
  it('로또 모델에 숫자 배열을 인자로 넣어서 인스턴스를 생성할 수 있다.', () => {
    const lotto = Lotto.create([1, 2, 3, 4, 5, 6]);
    expect(lotto.lottoNumbers).toContain(1, 2, 3, 4, 5, 6);
  });

  it('로또 모델의 배열에 들어갈 값은 1이상 45이하의 숫자여야 한다.', () => {
    const invalidInput = [1, 2, 3, 4, 5, 46];
    try {
      Lotto.create(invalidInput);
    } catch ({ message }) {
      expect(message).toEqual(ERROR_MESSAGE.LOTTO_NUMBER_IS_INVALIDATE);
    }
  });

  it('로또 모델의 번호와 당첨 번호를 비교하여 등수를 반환할 수 있어야 한다.', () => {
    const lottoNumbers = [1, 2, 3, 4, 5, 6];
    const winningFirstNumbers = [1, 2, 3, 4, 5, 6, 7];
    const winningSecondNumbers = [1, 2, 3, 4, 5, 7, 6];
    const notWinningNumbers = [7, 8, 9, 10, 11, 12, 13];

    const lotto = Lotto.create(lottoNumbers);
    expect(lotto.result(winningFirstNumbers)).toBe(NUMBER.FIRST_GRADE_INDEX);
    expect(lotto.result(winningSecondNumbers)).toBe(NUMBER.SECOND_GRADE_INDEX);
    expect(lotto.result(notWinningNumbers)).toBe(NUMBER.NOT_WINNING_INDEX);
  });
});
