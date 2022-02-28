import { RULES } from '../constants/index.js';
import { convertToNumber, pickLottoNumber } from '../util/common.js';

describe('로또 번호 생성 테스트', () => {
  it(`한 로또에는 ${RULES.LOTTO_NUMS}개의 숫자가 있다.`, () => {
    const numberList = pickLottoNumber(RULES.LOTTO_NUMS);

    expect(numberList).toHaveLength(RULES.LOTTO_NUMS);
  });

  it('로또 번호에는 중복이 없다.', () => {
    const numberList = pickLottoNumber(RULES.LOTTO_NUMS);

    expect(numberList).toHaveLength(new Set(numberList).size);
  });

  it(`모든 로또 번호는 ${RULES.MIN_LOTTO_NUMBER}~${RULES.MAX_LOTTO_NUMBER} 사이에 존재한다.`, () => {
    const numberList = pickLottoNumber(RULES.LOTTO_NUMS);

    expect(numberList.filter(number => number >= RULES.MIN_LOTTO_NUMBER && number <= RULES.MAX_LOTTO_NUMBER)).toHaveLength(RULES.LOTTO_NUMS);
  })
});

describe('문자열에서 숫자로의 변환 테스트', () => {
  it('문자열을 숫자로 변환한다.', () => {
    const string = '11000';

    expect(convertToNumber(string)).toEqual(Number(string));
  });
});
