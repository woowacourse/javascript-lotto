import { calculateProfitRate } from "../../common/service/ProfitService.js";
import { getState, setState } from "../state/state.js";
import LottoResult from "../../common/domain/LottoResult.js";
import { updateUI } from "../ui/updateUI.js";

export const ResultController = () => {
  const { lottoCount, lottoArray, winningLotto } = getState();

  const lottoResult = new LottoResult(winningLotto, lottoArray);
  const matchingCount = lottoResult.calculateResult();
  const profitRate = calculateProfitRate(matchingCount, lottoCount);

  setState({ profitRate: profitRate, matchingCount: matchingCount });
  updateUI();
};
