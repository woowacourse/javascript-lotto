import LottoResultMaker from "../domain/LottoResultMaker.js";
import LottoInputController from "./LottoInputController.js";
import LottoOutputController from "./LottoOutputController.js";

class LottoMainController {
  #outputController;

  #inputController;

  constructor(outputView, inputView) {
    this.#outputController = new LottoOutputController(outputView);
    this.#inputController = new LottoInputController(inputView, outputView);
  }

  async run() {
    const lottos = await this.#inputController.readLottos();

    this.#outputController.printBoughtLottos(lottos);

    const lottoBoard = await this.#inputController.readLottoBoard();
    const lottoResult = LottoResultMaker.getLottoResult(lottos, lottoBoard);

    this.#outputController.printLottoResult(lottoResult);
  }
}

export default LottoMainController;
