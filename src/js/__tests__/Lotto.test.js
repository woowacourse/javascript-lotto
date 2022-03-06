import Lotto from '../models/Lotto';
import { isValidRangeNumber } from '../utils/validator';

describe('로또의 번호는 유효한 타입과 유효한 범위여야 한다.', () => {
  it('로또번호는 6자리이다.', () => {
    const lotto = new Lotto().generate();
    console.log(lotto);

    expect(lotto._lottoNumbers).toHaveLength(6);
  });

  it('로또번호는 숫자로만 이루어져 있다.', () => {
    const lotto = new Lotto().generate();
    const isAllNumbers = lotto._lottoNumbers.every((number) => typeof number === 'number');

    expect(isAllNumbers).toBe(true);
  });

  it('로또 숫자는 1에서 45 사이여야 한다.', () => {
    const lotto = new Lotto().generate();
    const isAllValidRangeNumbers = lotto._lottoNumbers.every((number) =>
      isValidRangeNumber(1, 45, number)
    );

    expect(isAllValidRangeNumbers).toBe(true);
  });
});
