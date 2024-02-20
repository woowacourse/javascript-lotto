import LottoTicket from '../src/domain/entity/LottoTicket.js';

describe('구매한 로또 테스트', () => {
  test('성공하는 경우 테스트', () => {
    const LOTTO_NUMBERS = [1, 2, 3, 4, 5, 6];

    expect(new LottoTicket(LOTTO_NUMBERS).getNumbers()).toEqual(LOTTO_NUMBERS);
  });

  test('로또 번호에 중복이 있을 때, 에러를 발생시킨다.', () => {
    const LOTTO_NUMBERS = [1, 2, 3, 4, 6, 6];

    expect(() => new LottoTicket(LOTTO_NUMBERS)).toThrow('[Error]');
  });
});
