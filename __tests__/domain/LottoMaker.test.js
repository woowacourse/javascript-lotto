import LottoMaker from '../../src/domain/LottoMaker.js';
import { LOTTO_CONDITION } from '../../src/constants/constants.js';

describe('LottoMaker 클래스 테스트', () => {
  let lottoMaker;

  beforeEach(() => {
    lottoMaker = new LottoMaker(LOTTO_CONDITION.PRICE * 5);
  });

  test('구입 금액을 기준으로 구매 가능한 로또 개수를 계산한다', () => {
    expect(lottoMaker.lottoList.length).toBe(5);
  });

  test('주어진 숫자 배열을 이용하여 로또 객체를 생성한다', () => {
    expect(lottoMaker.create([1, 2, 3, 4, 5, 6]).numbers).toEqual([1, 2, 3, 4, 5, 6]);
  });
});
