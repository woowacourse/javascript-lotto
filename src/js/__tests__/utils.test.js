import { RULES } from '../constants/index.js';
import { convertToNumber, pickLottoNumber } from '../utils/common.js';

describe('로또 번호 랜덤 생성 함수 기능 테스트', () => {
  it('로또 랜덤 번호는 총 6개를 가져야 한다.', () => {
    const numbers = pickLottoNumber(RULES.LOTTO_NUMS);

    expect(numbers).toHaveLength(RULES.LOTTO_NUMS);
  });

  it('로또 랜덤 번호는 중복이 있어서는 안된다.', () => {
    const numbers = pickLottoNumber(RULES.LOTTO_NUMS);

    expect(numbers).toHaveLength(new Set(numbers).size);
  });
});

describe('숫자 타입으로 변환해주는 함수 기능 테스트', () => {
  it('문자열을 숫자 타입으로 변환해야 한다.', () => {
    const string = '11000';

    expect(convertToNumber(string)).toBe(Number(string));
  });
});
