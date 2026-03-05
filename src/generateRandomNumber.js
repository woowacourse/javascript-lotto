import Lotto from "./Lotto";

export const generateLottos = (randomNumbersList) => {
  return randomNumbersList.map((randomNumbers) => new Lotto(randomNumbers));
};
