import PurchaseAmount from "./PurchaseAmount.js";
import InputView from "./ui/InputView.js";
import LOTTO from "./constant/lotto.js";

import { getRandomNumber } from "./util/random.js";


export const purchase = async () => {
  const purchaseAmount = new PurchaseAmount(
    await InputView.readPurchaseAmount()
  ).price;
};

export const generateLotto = () => {
  const lotto = new Set();

  while (lotto.size < LOTTO.LENGTH) {
    const randomNumber = getRandomNumber();
    lotto.add(randomNumber);
  }

  return Array.from(lotto).sort((a,b) => a - b);
}
