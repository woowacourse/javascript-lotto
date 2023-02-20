import Lotto from '../src/domain/lotto/Lotto';

describe('Lotto', () => {
  context('로또번호가 주어졌을 때', () => {
    context('중복된 숫자가 있는 경우', () => {
      it.each([
        { lottoNumbers: [1, 2, 3, 4, 5, 5] },
        { lottoNumbers: [1, 1, 2, 10, 18, 19] },
        { lottoNumbers: [1, 2, 7, 8, 9, 1] },
      ])('$lottoNumbers → 예외를 던져야 한다.', ({ lottoNumbers }) => {
        expect(() => new Lotto(lottoNumbers)).toThrowError();
      });
    });

    context('1에서 45 사이의 정수가 아닌 경우', () => {
      it.each([
        {
          lottoNumbers: [0, 1, 2, 3, 4, 5],
          lottoNumbers: [1, 2, 3, 4, 5, -6],
          lottoNumbers: [41, 42, 43, 44, 45, 46],
          lottoNumbers: [1, 2, 3, 4, 5, 'a'],
          lottoNumbers: [8, 9, 10, 42, 43, '1a'],
          lottoNumbers: [8, 9, 10, 42, 43, '1a'],
        },
      ])('$lottoNumbers → 예외를 던져야 한다.', ({ lottoNumbers }) => {
        expect(() => new Lotto(lottoNumbers)).toThrowError();
      });
    });
  });
});
