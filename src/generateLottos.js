import Lotto from "./Lotto.js";

export const generateLottos = (randomNumbersList) => {
  return randomNumbersList.map((randomNumbers) => new Lotto(randomNumbers));
};
