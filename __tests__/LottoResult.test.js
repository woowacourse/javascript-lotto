import Lotto from '../src/domain/lotto/Lotto';
import LottoResult from '../src/domain/LottoResult';
import WinningLotto from '../src/domain/WinningLotto';

describe('LottoResult 클래스에 대한 테스트', () => {
  context('주어진 당첨 로또 번호로 LottoResult가 생성되었을 때', () => {
    // given
    const winningLotto = new WinningLotto([1, 2, 3, 4, 5, 6], 7);

    it.each([
      { lottoNumbers: [8, 9, 10, 11, 12, 13], expectedRewardMoney: 0 },
      { lottoNumbers: [1, 2, 3, 40, 41, 42], expectedRewardMoney: 5_000 },
      { lottoNumbers: [1, 2, 3, 4, 7, 41], expectedRewardMoney: 50_000 },
      { lottoNumbers: [1, 2, 3, 4, 5, 41], expectedRewardMoney: 1_500_000 },
      { lottoNumbers: [1, 2, 3, 4, 5, 7], expectedRewardMoney: 30_000_000 },
      { lottoNumbers: [1, 2, 3, 4, 5, 6], expectedRewardMoney: 2_000_000_000 },
    ])(
      '당첨 금액이 $expectedRewardMoney원인 것을 확인할 수 있어야 한다.',
      ({ lottoNumbers, expectedRewardMoney }) => {
        // given
        const lotto = new Lotto(lottoNumbers);

        // when
        const lottoResult = new LottoResult(winningLotto);
        const reward = lottoResult.findReward(lotto);
        const rewardMoney = reward?.getMoney() ?? 0;

        // then
        expect(rewardMoney).toBe(expectedRewardMoney);
      },
    );
  });
});
