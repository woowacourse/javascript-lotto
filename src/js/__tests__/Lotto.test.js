import { LOTTO_SETTING } from '../constants/setting';
import Lotto from '../models/Lotto';
import { isValidRangeNumber } from '../utils/validator';

describe('로또의 번호는 유효한 범위여야 한다.', () => {
  it(`로또 숫자는 ${LOTTO_SETTING.MIN_RANDOM_NUMBER}에서 ${LOTTO_SETTING.MAX_RANDOM_NUMBER} 사이여야 한다.`, () => {
    const lotto = new Lotto().generate();
    const isAllValidRangeNumbers = lotto._lottoNumbers.every((number) =>
      isValidRangeNumber(LOTTO_SETTING.MIN_RANDOM_NUMBER, LOTTO_SETTING.MAX_RANDOM_NUMBER, number)
    );

    expect(isAllValidRangeNumbers).toBe(true);
  });
});
