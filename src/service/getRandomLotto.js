import Lotto from "../domain/Lotto.js";
import { RANDOM_CONSTANT } from "../constants/constant.js";

export function getRandomLotto() {
  const lottoSet = new Set();

  while (lottoSet.size < RANDOM_CONSTANT.COUNT) {
    lottoSet.add(
      Math.floor(Math.random() * RANDOM_CONSTANT.MAX + RANDOM_CONSTANT.MIN),
    );
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
