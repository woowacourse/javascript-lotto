import { divider } from '../utils/util';
import { LOTTO_PRICE } from '../constants/constants';

import LottoManager from '../LottoManager';

describe('로또 구입 기능 테스트', () => {
  it('입력 금액으로 구입할 수 있는 로또 최대 개수를 구한다.', () => {
    const charge = 5500;
    const expectResult = {
      quotient: Math.floor(charge / LOTTO_PRICE),
      remainder: charge % LOTTO_PRICE,
    };
    expect(divider(charge, LOTTO_PRICE)).toStrictEqual(expectResult);
  });

  it('주어진 개수의 로또를 발급한다.', () => {
    const count = 7;
    const lottoManager = new LottoManager();
    lottoManager.generateNewLottos(count);

    expect(lottoManager.lottos).toHaveLength(count);
  });
});
