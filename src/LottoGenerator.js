import { LOTTO } from "./constants.js";
import Lotto from "./Model/Lotto.js";
import { getRandomNumber } from "./Utils.js";

const LottoGenerator = {
  calculateBuyLottoCount(money) {
    return money / LOTTO.PRICE;
  },

  getRandomLottoNumbers() {
    const randomNumbers = [];
    while (randomNumbers.length !== LOTTO.COUNT) {
      const randomNumber = getRandomNumber(LOTTO.LOWER, LOTTO.UPPER);
      if (randomNumbers.includes(randomNumber)) continue;

      randomNumbers.push(randomNumber);
    }

    return randomNumbers;
  },

  makeLottos(buyLottoCount) {
    return Array.from(
      { length: buyLottoCount },
      () => new Lotto(LottoGenerator.getRandomLottoNumbers()),
    );
  },
};

export default LottoGenerator;
