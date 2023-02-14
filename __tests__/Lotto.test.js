/* eslint-disable */
import Lotto from '../src/model/Lotto';

describe('Lotto 단일 객체 테스트', () => {
  const lotto = new Lotto();
  test('로또 숫자가 1~45 사이의 숫자인지 확인', () => {
    const lottoNum = lotto.lottoNum;

    expect(lottoNum.every(num => num >= 1 && num <= 45)).toBe(true);
  });

  test('로또 배열 길이가 6개인지 확인', () => {
    const lottoNum = lotto.lottoNum;

    expect(lottoNum.length === 6).toBe(true);
  });
});
