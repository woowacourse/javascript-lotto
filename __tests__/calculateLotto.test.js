import {
  calculateLottoTickets,
  calculateLottoPrize,
} from '../src/Utils/calculateLotto';
import { LOTTO_PRIZE_MONEY_DEFINITION } from '../src/Domain/Constant/definition.js';

test('구입 금액에 해당하는 로또 장수를 구한다.', () => {
  const purchaseMoney = 5000;
  const lottoCount = calculateLottoTickets(purchaseMoney);
  expect(lottoCount).toBe(5);
});

test('수익률을 반환한다.', () => {
  const result = {
    FIRST_PRIZE: 1,
    SECOND_PRIZE: 0,
    THIRD_PRIZE: 1,
    FOURTH_PRIZE: 0,
    FIFTH_PRIZE: 0,
    NONE: 0,
  };
  const prize = calculateLottoPrize(result);
  expect(prize).toBe(
    LOTTO_PRIZE_MONEY_DEFINITION.FIRST_PRIZE +
      LOTTO_PRIZE_MONEY_DEFINITION.THIRD_PRIZE
  );
});
