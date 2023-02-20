import { LOTTO_LENGTH } from '../src/data/Constants';
import Lotto from '../src/domain/Lotto';

test('로또 객체 생성', () => {
  // given
  const price = 8000;

  // when
  const lottoCount = Math.floor(price / 1000);
  const lottos = Array.from({ length: lottoCount }, () => new Lotto());

  // then
  lottos.forEach((lotto) => {
    const mySet = new Set(lotto.lottoNumber);
    expect([...mySet]).toHaveLength(LOTTO_LENGTH);
  });
});
