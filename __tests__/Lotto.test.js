/* eslint-disable */
import Lotto from '../src/model/Lotto';

describe('Lotto 단일 객체 테스트', () => {
  const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
  const { lottoNum } = lotto;
  
  test('로또 숫자가 1~45 사이의 숫자인지 확인', () => {
    expect(lottoNum.every(num => num >= 1 && num <= 45)).toBe(true);
  });

  test('로또 배열 길이가 6개인지 확인', () => {
    expect(lottoNum.length === 6).toBe(true);
  });

  test('로또 배열에 겹치는 숫자가 없는지 확인', () => {
    expect(new Set(lottoNum).size === 6);
  });

  test('로또 배열이 오름차순으로 정렬되어있는지 확인', () => {
    expect(lottoNum === lottoNum.sort((prev, cur) => prev - cur)).toBe(true);
  });
});
