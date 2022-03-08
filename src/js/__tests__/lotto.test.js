import { getNumberOfLotto } from '../core/drawLotto.js';

const isUniqueLottoNumber = lottoNumbers => {
  return lottoNumbers.length === new Set(lottoNumbers).size;
};

describe('로또가 알맞게 생성이 되는지 테스트', () => {
  test('입력 금액에 맞게 로또가 생성되는지 확인한다', () => {
    const input = 2000;
    expect(getNumberOfLotto(input)).toBe(2);
  });

  test('로또 번호를 생성할 때에는 중복값이 없도록 한다.', () => {
    const input = [
      [1, 2, 3, 4, 5, 6],
      [1, 2, 33, 33, 4, 5],
    ];
    expect(isUniqueLottoNumber(input[0])).toBe(true);
    expect(isUniqueLottoNumber(input[1])).toBe(false);
  });
});
