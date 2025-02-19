import PurchaseAmount from "./PurchaseAmount.js";
import InputView from "./ui/InputView.js";
import OutputView from './ui/OutputView.js';
import LOTTO from "./constant/lotto.js";
import { getRandomNumber } from "./util/random.js";
import { PRICE } from "./constant/price.js";
import Calculator from "./Calculator.js";
import Lotto from "./Lotto.js";
import BonusNumber from "./BonusNumber.js";


export const purchase = async () => {
  const purchaseAmount = new PurchaseAmount(
    await InputView.readPurchaseAmount()
  ).price;

  const quantity = purchaseAmount / PRICE.UNIT;
  const lottoNumbers = Array.from({length: quantity}, () => generateLotto());
  lottoNumbers.forEach((nums) => {
    OutputView.printLotto(nums);
  })

  const lottoAndBonus = await readWinningInfo();
};

const readWinningInfo = async () => {
  const winningNumbers = await InputView.readWinningNumbers();
  const bonusNumber = await InputView.readBonusNumber();
  
  return {
    lotto: new Lotto(winningNumbers),
    bonus: new BonusNumber(bonusNumber, winningNumbers)
  }
}

export const generateLotto = () => {
  const lotto = new Set();

  while (lotto.size < LOTTO.LENGTH) {
    const randomNumber = getRandomNumber();
    lotto.add(randomNumber);
  }

  return Array.from(lotto).sort((a,b) => a - b);
}
