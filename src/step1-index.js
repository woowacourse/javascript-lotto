import OutputView from "./view/OutputView.js";
import retryOnError from "./util/retryOnError.js";
import { getRetryInput } from "./service/InputService.js";
import { PurchaseController } from "./controller/PurchaseController.js";
import { WinningController } from "./controller/WinningController.js";
import { ResultController } from "./controller/ResultController.js";
import { ProfitController } from "./controller/ProfitController.js";
import { RETRY_ANSWER } from "./lottoConstants/systemConstants.js";

const runLotto = async () => {
  while (true) {
    const { lottoArray, lottoCount } = await PurchaseController();
    const winningLotto = await WinningController();
    const matchingCount = ResultController(winningLotto, lottoArray);
    ProfitController(matchingCount, lottoCount);

    const yesOrNo = await retryOnError(getRetryInput, OutputView.printError);
    if (yesOrNo === RETRY_ANSWER.NO) {
      break;
    }
  }
};

await runLotto();
