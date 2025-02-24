import OutputView from "./ui/OutputView.js";
import Calculator from "./Calculator.js";
import Ranking from "./Ranking.js";
import generateLotto from "./LottoMachine.js";
import PRICE from "./constant/price.js";
import InputView from "./ui/InputView.js";

import {
  validateBonusNumber,
  validatePurchaseAmount,
  validateWinningNumbers,
  validateRestart,
} from "./util/validate.js";
import retryAsync from "./util/retryAsync.js";

const purchase = async () => {
  const purchaseAmount = await retryAsync(getPurchaseAmount);
  const quantity = purchaseAmount / PRICE.UNIT;
  OutputView.printQuantity(quantity);
  const lottoNumbers = generateLottoNumbers(quantity);
  displayLottoNumbers(lottoNumbers);

  const winningAndBonus = await readWinningNumbersAndBonusNumber();
  const winningRanks = Ranking.countWinningRanks(lottoNumbers, winningAndBonus);
  OutputView.printWinningDetailTitle();
  const rankKeys = Object.keys(winningRanks).reverse();
  OutputView.printWinningDetail(winningRanks, rankKeys);

  const totalPrize = Calculator.getTotalPrize(winningRanks);
  const yieldRate = Calculator.getYieldRate(purchaseAmount, totalPrize);
  OutputView.printYieldRate(yieldRate);
};

const getPurchaseAmount = async () => {
  const amount = await InputView.readPurchaseAmount();
  validatePurchaseAmount(amount);

  return amount;
};

const getWinningNumbers = async () => {
  const winningNumbers = await InputView.readWinningNumbers();
  validateWinningNumbers(winningNumbers);

  return winningNumbers;
};

const getBonusNumber = async (winningNumbers) => {
  const bonusNumber = await InputView.readBonusNumber();
  validateBonusNumber(bonusNumber, winningNumbers);

  return bonusNumber;
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
  const winningNumbers = await retryAsync(getWinningNumbers);
  const bonusNumber = await retryAsync(() => getBonusNumber(winningNumbers));

  return {
    winning: winningNumbers,
    bonus: bonusNumber,
  };
};

export default purchase;
