import { LOTTO_PRICE } from '../constants/lotto-constants.js';
import RETRY_INPUT from '../constants/system.js';
import LottoResultCalculator from '../domain/lottoResultCalculator.js';
import inputView from '../view/inputView.js';
import outputView from '../view/outputView.js';

import LottoPurchaseController from './lottoPurchaseController.js';
import WinningLottoGenerator from './winningLottoGenerator.js';

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

  async #createValidatedWinningLotto() {
    const winningLottoGenerator = new WinningLottoGenerator();
    const { winningLottoNumbers, bonusNumber } = await winningLottoGenerator.createWinningLotto();

    return { winningLottoNumbers, bonusNumber };
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
