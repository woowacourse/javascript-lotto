import { RETRY_ANSWER } from "./lottoConstants/systemConstants.js";
import { ProfitController } from "./terminal/controller/ProfitController.js";
import { PurchaseController } from "./terminal/controller/PurchaseController.js";
import { ResultController } from "./terminal/controller/ResultController.js";
import { WinningController } from "./terminal/controller/WinningController.js";
import { getRetryInput } from "./terminal/service/InputService.js";
import OutputView from "./terminal/view/outputView.js";
import retryOnError from "./util/retryOnError.js";

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
