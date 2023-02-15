import Lotto from "./Lotto.js";
import generateRandomNumbersInRange from "../utils/RandomNumberGenerator.js";

class LottoGame {
  #userLottos;
  #gameLottos;

  generateUserLottos(purchaseCount) {
    this.#userLottos = Array.from({ length: purchaseCount }).map(() => {
      const RANDOM_NUMBER = generateRandomNumbersInRange(1, 45, 6);

      return new Lotto(RANDOM_NUMBER);
    });
  }

  getUserLottos() {
    return this.#userLottos.map((userLotto) => userLotto.getNumbers());
  }

  setGameLottos(winningNumbers, bonusNumber) {
    this.#gameLottos = { winningNumbers, bonusNumber };
  }

  setBonusNumber(number) {
    this.#gameLottos.bonusNumber = number;
  }
}

export default LottoGame;
