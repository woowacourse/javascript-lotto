import Lotto from "../domain/Lotto.js";

export function getRandomLotto() {
  const lottoSet = new Set();

  while (lottoSet.size < 6) {
    lottoSet.add(Math.floor(Math.random() * 45 + 1));
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
