import Lotto from '../src/domain/Lotto';
import LottoResult from '../src/domain/LottoResult';
import Reward from '../src/domain/Reward';

describe('Reward 클래스에 대한 테스트 작성', () => {
  test('로또가 주어졌을 때 Reward에 자격이 있는 지 검사한다.', () => {
    // given
    const lotto = new Lotto([1, 2, 3, 4, 7, 45]);
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;
    const lottoResult = new LottoResult(winningNumbers, bonusNumber);

    const matchingNumbers = 4;
    const money = 30_000;
    const reward = new Reward(matchingNumbers, money);

    // when
    const canReceiveReward = lottoResult.canReceiveReward(lotto, reward);

    // then
    expect(canReceiveReward).toBeTruthy();
  });
});
