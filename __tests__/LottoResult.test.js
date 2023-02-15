import Lotto from '../src/domain/Lotto';
import LottoResult from '../src/domain/LottoResult';

describe('LottoResult 클래스에 대한 테스트', () => {
  test.each([
    [[1, 2, 3, 40, 41, 42], 5000],
    [[1, 2, 3, 4, 7, 41], 50000],
    [[1, 2, 3, 4, 5, 41], 1_500_000],
    [[1, 2, 3, 4, 5, 7], 30_000_000],
    [[1, 2, 3, 4, 5, 6], 2_000_000_000],
  ])(
    '사용자는 구매한 로또에 대한 당첨 금액을 계산할 수 있다.',
    (lottoNumbers, expectedRewardMoney) => {
      // given
      const lotto = new Lotto(lottoNumbers);
      const winningNumbers = [1, 2, 3, 4, 5, 6];
      const bonusNumber = 7;

      // when
      const lottoResult = new LottoResult(winningNumbers, bonusNumber);
      const rewardMoney = lottoResult.exchangeLottoIntoMoney(lotto);

      // then
      expect(rewardMoney).toBe(expectedRewardMoney);
    },
  );
});
