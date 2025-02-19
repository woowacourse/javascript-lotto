import LottoMaker from '../src/domain/LottoMaker.js';
import { LOTTO_CONDITION } from '../src/constants/constants.js';
import Lotto from '../src/domain/Lotto.js';

describe('Lotto Maker 클래스 테스트', () => {
  test('구입 금액에 따른 로또 발행 테스트', () => {
    const lottoMaker = new LottoMaker(LOTTO_CONDITION.PRICE * 5);

    expect(lottoMaker.getLottoCount()).toBe(5);
  });

  test('로또 생성 테스트', () => {
    const lottoMaker = new LottoMaker(LOTTO_CONDITION.PRICE);
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);

    expect(lottoMaker.create([1, 2, 3, 4, 5, 6]).numbers).toEqual(lotto.numbers);
  });
});
