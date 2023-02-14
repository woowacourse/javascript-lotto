/* eslint-disable */

describe('Lotto 단일 객체 테스트', () => {
  test('로또 숫자가 1~45 사이의 숫자인지 확인', () => {
    const lotto = new Lotto();

    const lottoNum = lotto.lottoNum;

    expect(() => {
      lottoNum.every(num => num >= 1 && num <= 45);
    }).toEqual(true);
  });
});
