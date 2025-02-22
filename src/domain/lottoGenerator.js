import { PURCHASE, LOTTO } from "../config/const.js";
import Lotto from "./Lotto.js";

function getRandomNumbers() {
  const randomNumbers = new Set();
  while (randomNumbers.size < LOTTO.MAX_LENGTH) {
    randomNumbers.add(
      Math.floor(Math.random() * LOTTO.MAX_NUMBER) + LOTTO.MIN_NUMBER
    );
  }
  return [...randomNumbers];
}

function getGenerateLottos(price) {
  let generatedLottos = [];
  for (let i = 0; i < price / PURCHASE.UNIT; i++) {
    generatedLottos.push(new Lotto(getRandomNumbers()));
  }
  return generatedLottos;
}

export default getGenerateLottos;
