import LottoManager from '../src/Domain/Model/LottoManager.js';
import WinningLotto from '../src/Domain/Model/WinningLotto.js';
import Lotto from '../src/Domain/Model/Lotto.js';
import { LOTTO_PRIZE_MONEY_DEFINITION } from '../src/Domain/Constant/definition.js';

test('로또 7장 구매해서 1등,2등,3등,4등,5등,6등,당첨안됨 각각 1번씩 당첨된 내역을 반환한다.', () => {
  const lottoList = [
    new Lotto([1, 2, 3, 4, 5, 6]),
    new Lotto([1, 2, 3, 4, 5, 7]),
    new Lotto([1, 2, 3, 4, 5, 8]),
    new Lotto([1, 2, 3, 4, 8, 9]),
    new Lotto([1, 2, 3, 8, 9, 10]),
    new Lotto([1, 2, 7, 8, 9, 10]),
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
    NONE: 1,
  });
});

test('1등(2_000_000_000) 1장, 3등(1_500_000) 1장 당첨금액을 반환한다.', () => {
  const lottoList = [
    new Lotto([1, 2, 3, 4, 5, 6]),
    new Lotto([1, 2, 3, 4, 5, 9]),
  ];
  const winningLotto = new WinningLotto(new Lotto([1, 2, 3, 4, 5, 6]), 7);
  const lottoManager = new LottoManager(winningLotto, lottoList);
  const result = lottoManager.compareWinningLotto();
  const prize = lottoManager.calculatePrize(result);

  expect(prize).toBe(
    LOTTO_PRIZE_MONEY_DEFINITION.FIRST_PRIZE +
      LOTTO_PRIZE_MONEY_DEFINITION.THIRD_PRIZE,
  );
});

test('1000원으로 1등(2,000,000,000원) 로또 1장 구매 시 수익률 200,000,000을 반환한다.', () => {
  const lottoList = [new Lotto([1, 2, 3, 4, 5, 6])];
  const winningLotto = new WinningLotto(new Lotto([1, 2, 3, 4, 5, 6]), 7);
  const lottoManager = new LottoManager(winningLotto, lottoList);
  const result = lottoManager.compareWinningLotto();
  const prize = lottoManager.calculatePrize(result);
  const profit = lottoManager.calculateProfit(prize);

  expect(profit).toBe(200_000_000);
});
