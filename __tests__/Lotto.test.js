import LottoManager from '../src/Domain/Model/LottoManager.js';

test('구입 금액에 해당하는 로또 장수를 구한다.', () => {
  const lottoManager = new LottoManager();
  const purchaseMoney = 5000;
  const lottoCount = lottoManager.purchaseLotto(purchaseMoney);
  expect(lottoCount).toBe(5);
});
