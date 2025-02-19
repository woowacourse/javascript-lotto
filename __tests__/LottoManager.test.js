import LottoManager from '../src/Domain/Model/LottoManager.js';
import { LOTTO_DEFINITION } from '../src/Domain/Constant/Definition.js';
import { makeNotDuplicatedRandomNumbers } from '../src/Utils/math.js';

test('구입 금액에 해당하는 로또 장수를 구한다.', () => {
  const lottoManager = new LottoManager();
  const purchaseMoney = 5000;
  const lottoCount = lottoManager.purchaseLotto(purchaseMoney);
  expect(lottoCount).toBe(5);
});

test('로또 장수에 따라 여러 장 발행한다.', () => {
  const purchaseMoney = 4000;
  const lottoManager = new LottoManager();
  const lottoCount = lottoManager.purchaseLotto(purchaseMoney);
  lottoManager.makeLottoList(lottoCount);
  expect(lottoManager.getLottoList().length).toBe(4);
});

test('로또 1장당 범위내에서 중복되지 않는 랜덤한 번호 6개를 만든다.', () => {
  const lottoNumbers = makeNotDuplicatedRandomNumbers(
    LOTTO_DEFINITION.NUMBER_COUNTS,
    {
      min: LOTTO_DEFINITION.MIN_NUMBER,
      max: LOTTO_DEFINITION.MAX_NUMBER,
    }
  );
  expect(lottoNumbers.length).toBe(LOTTO_DEFINITION.NUMBER_COUNTS);
});
