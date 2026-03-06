import Lotto from "../domain/Lotto.js";
import { LOTTO_RANGE } from "../constants/constant.js";

export function getRandomLotto() {
  const lottoSet = new Set();

  while (lottoSet.size < LOTTO_RANGE.COUNT) {
    lottoSet.add(Math.floor(Math.random() * LOTTO_RANGE.MAX + LOTTO_RANGE.MIN));
  }

  const lottoArray = Array.from(lottoSet);
  lottoArray.sort((a, b) => a - b);

  return lottoArray;
}

export function getLottos(count) {
  const lottos = [];
  for (let i = 0; i < count; i++) {
    const lotto = getRandomLotto();
    lottos.push(new Lotto(lotto));
  }
  return lottos;
}
