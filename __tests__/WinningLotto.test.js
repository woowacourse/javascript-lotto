import WinningLotto from '../src/domain/WinningLotto';

describe('WinningLotto 클래스에 대한 테스트', () => {
  test.each([0, 46, -3])(
    '보너스 번호는 1에서 45 사이의 숫자가 아닌 경우 예외를 던져야 한다',
    (bonusNumber) => {
      const lottoNumbers = [1, 2, 3, 4, 5, 6];

      expect(() => new WinningLotto(lottoNumbers, bonusNumber)).toThrowError();
    },
  );

  test.each([
    [[1, 2, 3, 4, 5, 6], 5],
    [[1, 2, 3, 4, 5, 6], 1],
  ])('로또 번호와 보너스 번호가 중복될 경우 예외를 던져야 한다.', (lottoNumbers, bonusNumber) => {
    expect(() => new WinningLotto(lottoNumbers, bonusNumber)).toThrowError();
  });
});
