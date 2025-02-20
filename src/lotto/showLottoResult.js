import { getRevenueRate } from "../utils/math.js";
import printLottoResult from "../view/output/printLottoResult.js";
import calculatePrizeResult from "./calculatePrizeResult.js";
import getTotalPrizeMoney from "./getTotalPrizeMoney.js";

const showLottoResult = (
  lottoNumbers,
  winningNumbers,
  bonusNumber,
  lottoPrice
) => {
  const lottoResult = calculatePrizeResult(
    lottoNumbers,
    winningNumbers,
    bonusNumber
  );
  const totalPrizeMoney = getTotalPrizeMoney(lottoResult);
  const revenueRate = getRevenueRate(totalPrizeMoney, lottoPrice);
  printLottoResult(lottoResult, revenueRate);
};

export default showLottoResult;
