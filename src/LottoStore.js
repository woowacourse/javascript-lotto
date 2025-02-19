import PurchaseAmount from "./PurchaseAmount.js";
import InputView from "./ui/InputView.js";
import OutputView from './ui/OutputView.js';
import LOTTO from "./constant/lotto.js";
import { getRandomNumber } from "./util/random.js";
import { PRICE } from "./constant/price.js";


export const purchase = async () => {
  const purchaseAmount = new PurchaseAmount(
    await InputView.readPurchaseAmount()
  ).price;

  // 임시 코드
  const quantity = purchaseAmount / PRICE.UNIT;
  const lottoNumbers = Array.from({length: quantity}, () => generateLotto());
  lottoNumbers.forEach((nums) => {
    OutputView.printLotto(nums);
  })
  
};

export const generateLotto = () => {
  const lotto = new Set();

  while (lotto.size < LOTTO.LENGTH) {
    const randomNumber = getRandomNumber();
    lotto.add(randomNumber);
  }

  return Array.from(lotto).sort((a,b) => a - b);
}
