import WinningLotto from '../src/domain/WinningLotto';

describe('WinningLotto 클래스에 대한 테스트', () => {
  test.each([
    [[1, 2, 3, 4, 5, 6], 5],
    [[1, 2, 3, 4, 5, 6], 1],
  ])('로또 번호와 보너스 번호가 중복될 경우 예외를 던져야 한다.', (lottoNumbers, bonusNumber) => {
    expect(() => new WinningLotto(lottoNumbers, bonusNumber)).toThrowError();
  });
});
