import Lotto from "../domain/Lotto.js";

export function getLottos(count) {
  const randomLottos = [];
  for (let i = 0; i < count; i++) {
    const lotto = Lotto.generateRandomLotto();
    randomLottos.push(new Lotto(lotto));
  }
  return randomLottos;
}
