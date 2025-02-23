import LottoMachine from '../src/Domain/Model/LottoMachine.js';
import { LOTTO_DEFINITION } from '../src/Domain/Constant/definition.js';
import { makeNotDuplicatedRandomNumbers } from '../src/Utils/array.js';

test('구입 금액에 해당하는 로또 장수를 구한다.', () => {
  const lottoMachine = new LottoMachine();
  const purchaseMoney = 5000;
  const lottoCount = lottoMachine.purchaseLotto(purchaseMoney);
  expect(lottoCount).toBe(5);
});

test('로또 장수에 따라 여러 장 발행한다.', () => {
  const purchaseMoney = 4000;
  const lottoMachine = new LottoMachine();
  const lottoCount = lottoMachine.purchaseLotto(purchaseMoney);
  lottoMachine.makeLottoList(lottoCount);
  expect(lottoMachine.getLottoList().length).toBe(4);
});

test('로또 1장당 1이상 45이하에서 중복되지 않는 랜덤한 번호 6개를 만든다.', () => {
  const lottoNumbers = makeNotDuplicatedRandomNumbers(
    LOTTO_DEFINITION.NUMBER_COUNTS,
    {
      min: LOTTO_DEFINITION.MIN_NUMBER,
      max: LOTTO_DEFINITION.MAX_NUMBER,
    },
  );
  expect(lottoNumbers.length).toBe(LOTTO_DEFINITION.NUMBER_COUNTS);
});

describe('로또 4장의 숫자 값들만 2차원 배열로 가져온다.', () => {
  test('로또 4장이 맞는지 확인한다', () => {
    const purchaseMoney = 4000;
    const lottoMachine = new LottoMachine();
    const lottoCount = lottoMachine.purchaseLotto(purchaseMoney);
    lottoMachine.makeLottoList(lottoCount);
    expect(lottoMachine.getLottoNumbersList().length).toBe(4);
  });
  test('로또 1장마다 숫자가 6개 있는지 확인한다', () => {
    const purchaseMoney = 4000;
    const lottoMachine = new LottoMachine();
    const lottoCount = lottoMachine.purchaseLotto(purchaseMoney);
    lottoMachine.makeLottoList(lottoCount);
    lottoMachine
      .getLottoNumbersList()
      .forEach((numbers) => expect(numbers.length).toBe(6));
  });
});
