import LottoNumberList from '../src/domain/entity/LottoNumberList.js';

describe('구매한 로또 테스트', () => {
  test('성공하는 경우 테스트', () => {
    const LOTTO_NUMBERS = ['1', '2', '3', '4', '5', '6'];
    const EXPECTED_NUMBERS = [1, 2, 3, 4, 5, 6];

    expect(LottoNumberList.fromString(LOTTO_NUMBERS).getNumbers()).toEqual(
      EXPECTED_NUMBERS,
    );
  });

  test('로또 번호에 중복이 있을 때, 에러를 발생시킨다.', () => {
    const LOTTO_NUMBERS = ['1', '2', '3', '4', '6', '6'];

    expect(() => LottoNumberList.fromString(LOTTO_NUMBERS)).toThrow('[Error]');
  });

  test('로또 번호에 중복이 있을 때, 에러를 발생시킨다.', () => {
    const LOTTO_NUMBERS = ['1', '2', '4', '3', '5', '6'];

    expect(LottoNumberList.fromString(LOTTO_NUMBERS).getNumbers()).toEqual([
      1, 2, 3, 4, 5, 6,
    ]);
  });
});
