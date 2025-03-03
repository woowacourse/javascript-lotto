import Calculator from "./Calculator.js";

import LottoCenter from "./LottoCenter.js";
import generateLotto from "./LottoMachine.js";

const purchase = async () => {
  const purchaseAmount = await InputHandler.getPurchaseAmount();
  const lottos = getLottos(purchaseAmount);
  showLottos(lottos);

  const lottoAndBonus = await readWinningInfo();
  const winningCounts = LottoCenter.getWinningCounts(lottos, lottoAndBonus);
  showWinningDetail(winningCounts);

  const yieldRate = getYieldRate(winningCounts, purchaseAmount);
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

export const getLottos = (purchaseAmount) => {

  const quantity = Calculator.getQuantity(purchaseAmount);
  return Array.from({ length: quantity }, () => generateLotto());
};

export const getYieldRate = (winningCounts, purchaseAmount) => {

  const totalPrize = Calculator.getTotalPrize(winningCounts);

  return Calculator.getYieldRate(purchaseAmount, totalPrize);
};

const showWinningDetail = (winningCounts) => {
  OutputView.printWinningDetailTitle();
  OutputView.printWinningDetail(winningCounts);
};

const showLottos = (lottos) => {
  OutputView.printQuantity(lottos.length);
  OutputView.printLottos(lottos);
};

export default purchase;
