import PurchaseAmount from "./PurchaseAmount.js";
import InputView from "./ui/InputView.js";
import OutputView from './ui/OutputView.js';
import LOTTO from "./constant/lotto.js";
import { getRandomNumber } from "./util/random.js";
import { PRICE } from "./constant/price.js";
import Calculator from "./Calculator.js";
import Lotto from "./Lotto.js";
import BonusNumber from "./BonusNumber.js";
import InputHandler from "./util/InputHandler.js";


export const purchase = async () => {
  const purchaseAmount = await InputHandler.getPurchaseAmount();

  const quantity = purchaseAmount / PRICE.UNIT;
  const lottoNumbers = Array.from({length: quantity}, () => generateLotto());
  lottoNumbers.forEach((nums) => {
    OutputView.printLotto(nums);
  })

  const lottoAndBonus = await readWinningInfo();
  const winningCount = Calculator.winningCount(lottoNumbers, lottoAndBonus);
  OutputView.printWinningDetailTitle();
  OutputView.printWinningDetail(winningCount);

  const totalPrize = Calculator.totalPrize(winningCount);
  const yieldRate = Calculator.yieldRate(purchaseAmount, totalPrize);
  OutputView.printYieldRate(yieldRate);
};

const readWinningInfo = async () => {
  const winningNumbers = await InputHandler.getWinningNumbers();
  const bonusNumber = await InputHandler.getBonusNumber(winningNumbers);

  // here!!
  return {
    winning: new Lotto(winningNumbers).numbers,
    bonus: new BonusNumber(bonusNumber, winningNumbers).number
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
