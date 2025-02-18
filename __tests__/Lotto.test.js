import LottoManager from '../src/Domain/Model/LottoManager.js';
import Lotto from '../src/Domain/Model/Lotto.js';
import { LOTTO_DEFINITION } from '../src/Domain/Constant/Definition.js';
test('구입 금액에 해당하는 로또 장수를 구한다.', () => {
  const lottoManager = new LottoManager();
  const purchaseMoney = 5000;
  const lottoCount = lottoManager.purchaseLotto(purchaseMoney);
  expect(lottoCount).toBe(5);
});

test('로또 1장을 발행한다.', () => {
  const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
  expect(lotto.getNumbers().length).toBe(LOTTO_DEFINITION.NUMBER_COUNTS);
});
