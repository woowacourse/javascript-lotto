/* eslint-disable */
import Lotto from '../src/js/model/Lotto';
import { values } from '../src/js/constants/values';

describe('Lotto 단일 객체 테스트', () => {
  let lotto;

  beforeEach(() => {
    lotto = new Lotto([1, 2, 3, 4, 5, 6]);
  });
  test('로또 숫자가 1~45 사이의 숫자여야 한다.', () => {
    const lottoNum = lotto.lottoNum;

    expect(lottoNum.every(num => num >= values.LOWER_BOUND && values.UPPER_BOUND <= 45)).toBe(true);
  });

  test('로또 배열 길이가 6개이어야 한다.', () => {
    const lottoNum = lotto.lottoNum;

    expect(lottoNum.length === values.LOTTO_LENGTH).toBe(true);
  });

  test('로또 배열에 겹치는 숫자가 없어야 한다.', () => {
    const lottoNum = lotto.lottoNum;

    expect(new Set(lottoNum).size === values.LOTTO_LENGTH);
  });

  test('로또 배열이 오름차순으로 정렬되어야 한다.', () => {
    const lottoNum = lotto.lottoNum;

    expect(lottoNum === lottoNum.sort((prev, cur) => prev - cur)).toBe(true);
  });
});
