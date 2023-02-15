import { LottoStore } from '../../src/domain/Lotto';

const AMOUNT = 8000;
const PRICE = 1000;
describe('로또', () => {
  test('구입 금액만큼 로또를 구매한다', () => {
    const lottoList = LottoStore.purchase(AMOUNT);

    expect(lottoList.length).toBe(AMOUNT / PRICE);
  });
});
