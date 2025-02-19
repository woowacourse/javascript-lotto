import LottoManager from '../src/Domain/Model/LottoManager.js';

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
