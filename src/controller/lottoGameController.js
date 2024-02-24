import { LOTTO_PRICE } from "../constants/lotto-constants.js";
import { RETRY_INPUT } from "../constants/view-messages.js";
import LottoMachine from "../domain/LottoMachine.js";
import LottoResult from "../domain/LottoResult.js";
import executeOrRetryAsync from "../utils/executeOrRetryAsync.js";
import CommonValidator from "../validator/CommonValidator.js";
import purchaseAmountValidator from "../validator/PurchaseAmountValidator.js";
import InputView from "../view/InputView.js";
import OutputView from "../view/OutputView.js";
import LottoPurchaseController from "./LottoPurchaseController.js";
import WinningLottoGenerator from "./winningLottoGenerator.js";

class LottoGameController {
  #inputView;
  #outputView;

  constructor() {
    this.#inputView = InputView;
    this.#outputView = OutputView;
  }

  async play() {
    const lottoList = await this.dd();
    const { winningLottoNumbers, bonusNumber } =
      await this.#createValidatedWinningLotto();

    this.#getGameResult({ lottoList, winningLottoNumbers, bonusNumber });

    const restart = await this.#inputView.readRestartGame();
    if (restart === RETRY_INPUT) this.play();
  }

  async #createValidatedWinningLotto() {
    const winningLottoGenerator = WinningLottoGenerator();
    const { winningLottoNumbers, bonusNumber } =
      await winningLottoGenerator.createWinningLotto();

    return { winningLottoNumbers, bonusNumber };
  }

  async dd() {
    const lottoPurchaseController = LottoPurchaseController();
    const lottoTickets = await lottoPurchaseController.processPurchaseLotto();

    return lottoTickets;
  }

  #getGameResult({ lottoList, winningLottoNumbers, bonusNumber }) {
    const lottoResult = new LottoResult({
      lottoList,
      winningLottoNumbers,
      bonusNumber,
    });
    const totalResult = lottoResult.getTotalResult();
    const profit = lottoResult.getProfit(lottoList.length * LOTTO_PRICE);

    this.#outputView.printResult(totalResult);
    this.#outputView.printProfit(profit);
  }
}

export default LottoGameController;
