import { InputView } from "../view/input.js";
import { RETRY_ANSWER } from "../constants/constant.js";
import { PurchaseLottoController } from "./PurchaseLottoController.js";
import { WinningLottoController } from "./WinningLottoController.js";
import { ResultController } from "./ResultController.js";

class LottoController {
  async play() {
    const myLotto = await PurchaseLottoController();
    const winningLotto = await WinningLottoController();
    ResultController(myLotto, winningLotto);
    const retry = await InputView.inputRetry();
    if (RETRY_ANSWER.YES.includes(retry)) return this.play();
  }
}

export default LottoController;
