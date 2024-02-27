import { LOTTO_PRICE } from '../constants/lotto-constants.js';
import RETRY_INPUT from '../constants/system.js';
import LottoResultCalculator from '../domain/lottoResultCalculator.js';
import executeOrRetryAsync from '../utils/executeOrRetryAsync.js';
import inputView from '../view/consoleView/inputView.js';
import outputView from '../view/outputView.js';

import LottoPurchaseController from './lottoPurchaseController.js';

class LottoGameController {
  async play() {
    const lottoList = await this.#getPurchasedLottoTickets();
    const { winningLottoNumbers, bonusNumber } = await this.#createValidatedWinningLotto();

    this.#displayGameResult({ lottoList, winningLottoNumbers, bonusNumber });

    this.#restart();
  }

  async #restart() {
    const retryAnswer = await inputView.readRestartGame();

    if (RETRY_INPUT.YES.includes(retryAnswer.trim())) this.play();
  }

  async readWinningLotto() {
    const validatedWinningLottoInput = await executeOrRetryAsync(inputView.readWinningLottoNumber().bind(this));
    return validatedWinningLottoInput;
  }

  async #getPurchasedLottoTickets() {
    const lottoPurchaseController = new LottoPurchaseController();
    const lottoTickets = await lottoPurchaseController.processPurchaseLotto();

    return lottoTickets;
  }

  #displayGameResult({ lottoList, winningLottoNumbers, bonusNumber }) {
    const lottoResult = new LottoResultCalculator({
      lottoList,
      winningLottoNumbers,
      bonusNumber,
    });
    const totalResult = lottoResult.getTotalResult();
    const profit = lottoResult.getProfit(lottoList.length * LOTTO_PRICE);

    outputView.printResult(totalResult);
    outputView.printProfit(profit);
  }
}

export default LottoGameController;
