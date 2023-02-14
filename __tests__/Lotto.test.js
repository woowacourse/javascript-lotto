import Lotto from '../src/domain/Lotto';

describe('로또 클래스 테스트', () => {
  test('로또번호와 당첨번호를 비교하여 당첨 개수를 계산할 수 있다.', () => {
    //given
    const lottoNumbers = [1, 2, 3, 4, 5, 6];
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    //when
    const lotto = new Lotto(lottoNumbers);
    //then
    expect(lotto.countMatchingNumbers(winningNumbers)).toBe(6);
  });
});
