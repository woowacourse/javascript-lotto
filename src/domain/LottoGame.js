import Lotto from "./Lotto";
import generateRandomNumbersInRange from "../utils/RandomNumberGenerator";

class LottoGame {
  #userLottos;

  generateUserLottos(purchaseCount) {
    this.#userLottos = [...Array.from(purchaseCount)].map((each) => {
      const RANDOM_NUMBER = generateRandomNumbersInRange();
      return new Lotto(RANDOM_NUMBER);
    });
  }
}

export default LottoGame;
