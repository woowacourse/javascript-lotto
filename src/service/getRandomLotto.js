import Lotto from "../domain/Lotto.js";

export function getRandomLotto() {
  const lottoList = [];

  for (let j = 0; j < 6; j++) {
    lottoList[j] = Math.floor(Math.random() * 45 + 1);
  }

  lottoList.sort((a, b) => a - b);

  return lottoList;
}

export function getLottos(count) {
  const lottos = [];
  for (let i = 0; i < count; i++) {
    const lotto = getRandomLotto();
    lottos.push(new Lotto(lotto));
  }
  return lottos;
}
