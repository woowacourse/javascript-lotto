import { ResultController } from "../../terminal/controller/ResultController.js";
import { WinningController } from "../../terminal/controller/WinningController.js";
import { calculateProfitRate } from "../../terminal/service/ProfitService.js";
import { getState, setState } from "../state/state.js";
import { updateUI } from "../ui/updateUI.js";

export const resultHandler = async () => {
  const { lottoCount, lottoArray } = getState();

  const winningLotto = await WinningController();
  const matchingCount = ResultController(winningLotto, lottoArray);
  const profitRate = calculateProfitRate(matchingCount, lottoCount);

  setState({ matchingCount: matchingCount, profitRate: profitRate, isResultModalShow: true });
  updateUI();
};
