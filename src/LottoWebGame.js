import Lotto from './domain/models/Lotto';
import { LOTTO } from './constants';

class LottoWebGame {
  #lottos;

  constructor() {
    this.#lottos = [];
    this.bindEvents();
  }

  bindEvents = () => {};

  drawLotto = () => {
    const randomNumbers = Array.from(
      { length: LOTTO.maxNumber - LOTTO.minNumber + 1 },
      (_, i) => i + LOTTO.minNumber
    )
      .sort(() => Math.random() - 0.5)
      .slice(0, LOTTO.numbersLength)
      .sort((a, b) => a - b);

    return new Lotto(randomNumbers);
  };
}

export default LottoWebGame;
