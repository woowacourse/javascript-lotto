import { purchaseLotto } from '../../src/domain/purchaseLotto.js';
import { LOTTO_CONDITION } from '../../src/constants/constants.js';

describe('purchaseLotto 테스트', () => {
  test('구입 금액에 따른 로또 발행 테스트', () => {

    expect(purchaseLotto(5*LOTTO_CONDITION.PRICE).length).toBe(5);
  });
});
