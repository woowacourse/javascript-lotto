import LottoNumber from '../src/LottoNumber';

describe('LottoNumber 클래스 유닛테스트', () => {
  describe('validateNumber', () => {
    test('로또 번호는 1부터 45까지의 정수여야한다.', () => {
      // given
      const number = 1;

      // when & then
      expect(() => new LottoNumber(number)).not.toThrow();
    });

    test('로또 번호가 정수가 아니면 에러를 반환한다.', () => {
      // given
      const number = 1.5;

      // when & then
      expect(() => new LottoNumber(number)).toThrow('로또 번호는 정수여야 합니다.');
    });

    test('로또 번호가 1보다 작으면 에러를 반환한다.', () => {
      // given
      const number = -1;

      // when & then
      expect(() => new LottoNumber(number)).toThrow('로또 번호는 1부터 45 사이여야 합니다.');
    });

    test('로또 번호가 45보다 크면 에러를 반환한다.', () => {
      // given
      const number = 46;

      // when & then
      expect(() => new LottoNumber(number)).toThrow('로또 번호는 1부터 45 사이여야 합니다.');
    });
  });
});
