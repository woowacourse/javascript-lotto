import Lotto from "./Lotto";
import generateRandomNumbersInRange from "../utils/RandomNumberGenerator";

class LottoGame {
  #userLottos;

  generateUserLottos(purchaseCount) {
    this.#userLottos = Array.from({ length: purchaseCount }).map(() => {
      const RANDOM_NUMBER = generateRandomNumbersInRange(1, 45, 6);

      return new Lotto(RANDOM_NUMBER);
    });
  }

  getUserLottos() {
    return this.#userLottos.map((userLotto) => userLotto.getNumbers());
  }
}

export default LottoGame;
