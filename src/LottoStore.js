import OutputView from "./ui/OutputView.js";
import Calculator from "./Calculator.js";
import Ranking from "./Ranking.js";
import InputHandler from "./util/InputHandler.js";
import generateLotto from "./LottoMachine.js";
import PRICE from "./constant/price.js";

const purchase = async () => {
  const purchaseAmount = await InputHandler.getPurchaseAmount();
  const quantity = purchaseAmount / PRICE.UNIT;
  OutputView.printQuantity(quantity);
  const lottoNumbers = generateLottoNumbers(quantity);
  displayLottoNumbers(lottoNumbers);

  const winningAndBonus = await readWinningNumbersAndBonusNumber();
  const winningRanks = Ranking.countWinningRanks(lottoNumbers, winningAndBonus);
  OutputView.printWinningDetailTitle();
  const rankKeys = Object.keys(winningRanks).reverse();
  OutputView.printWinningDetail(winningRanks, rankKeys);

  const totalPrize = Calculator.totalPrize(winningRanks);
  const yieldRate = Calculator.yieldRate(purchaseAmount, totalPrize);
  OutputView.printYieldRate(yieldRate);
};

const generateLottoNumbers = (quantity) => {
  return Array.from({ length: quantity }, () => generateLotto());
};

const displayLottoNumbers = (lottoNumbers) => {
  lottoNumbers.forEach((nums) => {
    OutputView.printLotto(nums);
  });
};

const readWinningNumbersAndBonusNumber = async () => {
  const winningNumbers = await InputHandler.getWinningNumbers();
  const bonusNumber = await InputHandler.getBonusNumber(winningNumbers);

  return {
    winning: winningNumbers,
    bonus: bonusNumber,
  };
};

export default purchase;
