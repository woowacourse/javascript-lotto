import Lotto from "../domain/Lotto.js";

export function lottoService(count) {
  const lottos = [];
  for (let i = 0; i < count; i++) {
    lottos.push(new Lotto());
  }
  return lottos;
}
