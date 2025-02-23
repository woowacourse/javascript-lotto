import LottoManager from '../src/Domain/Model/LottoManager.js';
import WinningLotto from '../src/Domain/Model/WinningLotto.js';
import Lotto from '../src/Domain/Model/Lotto.js';
import { LOTTO_PRIZE_MONEY_DEFINITION } from '../src/Domain/Constant/definition.js';

test('로또 6장 구매해서 1,2,3,4,5,6등 각각 1번씩 당첨된 내역을 반환한다.', () => {
  const lottoList = [
    new Lotto([1, 2, 3, 4, 5, 6]),
    new Lotto([1, 2, 3, 4, 5, 7]),
    new Lotto([1, 2, 3, 4, 5, 8]),
    new Lotto([1, 2, 3, 4, 8, 9]),
    new Lotto([1, 2, 3, 8, 9, 10]),
  ];
  const winningLotto = new WinningLotto(new Lotto([1, 2, 3, 4, 5, 6]), 7);

  const lottoManager = new LottoManager(winningLotto, lottoList);
  const lottoResult = lottoManager.compareWinningLotto();

  expect(lottoResult).toEqual({
    FIRST_PRIZE: 1,
    SECOND_PRIZE: 1,
    THIRD_PRIZE: 1,
    FOURTH_PRIZE: 1,
    FIFTH_PRIZE: 1,
    NONE: 0,
  });
});

test('1등(2_000_000_000) 1장, 3등(1_500_000) 1장 당첨금액을 반환한다.', () => {
  const result = {
    FIRST_PRIZE: 1,
    SECOND_PRIZE: 0,
    THIRD_PRIZE: 1,
    FOURTH_PRIZE: 0,
    FIFTH_PRIZE: 0,
    NONE: 0,
  };

  const lottoManager = new LottoManager();
  const prize = lottoManager.calculatePrize(result);
  expect(prize).toBe(
    LOTTO_PRIZE_MONEY_DEFINITION.FIRST_PRIZE +
      LOTTO_PRIZE_MONEY_DEFINITION.THIRD_PRIZE,
  );
});
