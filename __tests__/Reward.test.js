import Lotto from '../src/domain/Lotto';
import Reward from '../src/domain/Reward';
import WinningLotto from '../src/domain/WinningLotto';

describe('Reward 클래스에 대한 테스트 작성', () => {
  test('사용자는 구매한 로또가 주어졌을 때 당첨 로또와 비교하여 보상을 받을 수 있는지 계산할 수 있다. ', () => {
    // given
    const lotto = new Lotto([1, 2, 3, 4, 7, 45]);
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;
    const winningLotto = new WinningLotto(new Lotto(winningNumbers), bonusNumber);

    const matchingNumbers = 4;
    const money = 30_000;
    const reward = new Reward(matchingNumbers, money);

    // when
    const canReceiveReward = reward.canReceive(lotto, winningLotto);

    // then
    expect(canReceiveReward).toBeTruthy();
  });
});
