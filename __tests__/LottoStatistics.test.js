import LottoStatistics from "../src/domain/model/LottoStatistics.js";
import Lotto from "../src/domain/model/Lotto.js";

let lottoStatistics;
beforeEach(() => {
  lottoStatistics = new LottoStatistics();
});

test('사용자가 구매한 로또 번호와 당첨된 번호가 5개 일치하고 보너스 번호도 일치할 경우, 해당 복권의 숫자를 +1 증가시킨다.', () => {
  const userLottos = [new Lotto([1, 2, 3, 4, 5, 6])];
  const winningLotto = {lottoNumber: [1, 2, 3, 4, 5, 45], bonusNumber: 6};
  const rankResult = lottoStatistics.compareLottos(userLottos, winningLotto);

  expect(rankResult[`5개 일치, 보너스 볼 일치`].count).toBe(1);
});

test('사용자가 구매한 로또 번호와 당첨된 번호가 3개 일치하면 해당 복권의 숫자를 +1 증가시킨다.', () => {
  const userLottos = [new Lotto([1, 2, 3, 4, 5, 6])];
  const winningLotto = {lottoNumber: [1, 2, 3, 33, 34, 45], bonusNumber: 9};
  const rankResult = lottoStatistics.compareLottos(userLottos, winningLotto);

  expect(rankResult[`3개 일치`].count).toBe(1);
});
