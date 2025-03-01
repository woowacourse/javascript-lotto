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
} from "./util/validate.js";
import retryAsync from "./util/retryAsync.js";

export const purchase = async () => {
  const { purchaseAmount, lottos } = await handlePurchase();
  const winningRanks = await handleWinningNumbers(lottos);
  // handleResult(purchaseAmount, winningRanks);
};

export const handlePurchase = async () => {
  const purchaseAmount = await retryAsync(getPurchaseAmount);
  const quantity = purchaseAmount / PRICE.UNIT;

  document.getElementById("purchased-count").innerText = '';
  OutputView.printQuantity(quantity);
  const lottos = generateLottos(quantity);
  displayLottoNumbers(lottos);

  return { purchaseAmount, lottos };
};

export const handleWinningNumbers = async (lottos) => {
  const winningAndBonus = await readWinningNumbersAndBonusNumber();
  const winningRanks = Ranking.countWinningRanks(lottos, winningAndBonus);

  OutputView.printWinningDetailTitle();
  const rankKeys = Object.keys(winningRanks).reverse();
  OutputView.printWinningDetail(winningRanks, rankKeys);

  return winningRanks;
};

const handleResult = (purchaseAmount, winningRanks) => {
  const totalPrize = Calculator.getTotalPrize(winningRanks);
  const yieldRate = Calculator.getYieldRate(purchaseAmount, totalPrize);
  OutputView.printYieldRate(yieldRate);
};

export const getPurchaseAmount = async () => {
  const amount = await InputView.readPurchaseAmount();
  console.log(amount);
  validatePurchaseAmount(amount);

  return amount;
};

const getWinningNumbers = async () => {
  const winningNumbers = await InputView.readWinningNumbers();
  console.log(winningNumbers);
  validateWinningNumbers(winningNumbers);

  return winningNumbers;
};

const getBonusNumber = async (winningNumbers) => {
  const bonusNumber = await InputView.readBonusNumber();
  validateBonusNumber(bonusNumber, winningNumbers);

  return bonusNumber;
};

const generateLottos = (quantity) => {
  return Array.from({ length: quantity }, () => generateLotto());
};

const displayLottoNumbers = (lottos) => {
  document.getElementById("generated-lottos").innerHTML = '';
  lottos.forEach((lotto) => {
    OutputView.printLotto(lotto.numbers);
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