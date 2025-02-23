import OutputView from "./ui/OutputView.js";
import Calculator from "./Calculator.js";
import InputHandler from "./util/InputHandler.js";
import generateLotto from "./LottoMachine.js";
import PRICE from "./constant/price.js";

const purchase = async () => {
  const purchaseAmount = await InputHandler.getPurchaseAmount();
  const quantity = purchaseAmount / PRICE.UNIT;
  OutputView.printQuantity(quantity);
  const lottoNumbers = Array.from({ length: quantity }, () => generateLotto());
  lottoNumbers.forEach((nums) => {
    OutputView.printLotto(nums);
  });

  const lottoAndBonus = await readWinningInfo();
  const winningCount = Calculator.getWinningCount(lottoNumbers, lottoAndBonus);
  OutputView.printWinningDetailTitle();
  OutputView.printWinningDetail(winningCount);

  const totalPrize = Calculator.getTotalPrize(winningCount);
  const yieldRate = Calculator.getYieldRate(purchaseAmount, totalPrize);
  OutputView.printYieldRate(yieldRate);
};

const readWinningInfo = async () => {
  const winningNumbers = await InputHandler.getWinningNumbers();
  const bonusNumber = await InputHandler.getBonusNumber(winningNumbers);

  return {
    winning: winningNumbers,
    bonus: bonusNumber,
  };
};

export default purchase;
