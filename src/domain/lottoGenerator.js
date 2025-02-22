import {
  LOTTO_MAX_RANGE,
  LOTTO_MIN_RANGE,
  MAX_LOTTO_LENGTH,
  PURCHASE_UNIT,
} from "../config/const.js";
import Lotto from "./Lotto.js";

function getRandomNumbers() {
  const randomNumbers = new Set();
  while (randomNumbers.size < MAX_LOTTO_LENGTH) {
    randomNumbers.add(
      Math.floor(Math.random() * LOTTO_MAX_RANGE) + LOTTO_MIN_RANGE
    );
  }
  return [...randomNumbers];
}

function getGenerateLottos(price) {
  let generatedLottos = [];
  for (let i = 0; i < price / PURCHASE_UNIT; i++) {
    generatedLottos.push(new Lotto(getRandomNumbers()));
  }
  return generatedLottos;
}

export default getGenerateLottos;
