import { LottoBuyer, RateOfReturnCalculator, WinningRank } from '../domain/index.js';
import { InputView, OutputView } from '../views/index.js';

import RetryHandler from '../errors/RetryHandler/RetryHandler.js';

/**
 * @module LottoGameController
 * 로또 구매, 로또 매칭, 당첨 결과 및 수익률 확인의 역할을 수행
 */
class LottoGameController {
  #retryCommands = ['Y', 'y'];

  /**
   * @returns {Promise<void>}
   */
  async run() {
    const { buyLottoPrice, lottoNumbers } = await this.#processBuyLotto();

    await this.#processDrawLottoResult({ buyLottoPrice, lottoNumbers });

    await this.#processRetryGame();
  }

  /**
   * @returns {Promise<import('../types/jsDoc.js').BuyLottoDetail>} 로또 구입 금액과 로또 번호 속성이 있는 객체의 Promise
   */
  async #processBuyLotto() {
    const buyLottoPrice = await RetryHandler.errorWithLogging(() => InputView.readBuyLottoPrice());
    const lottoBuyer = new LottoBuyer(buyLottoPrice);
    const lottoNumbers = lottoBuyer.purchase(buyLottoPrice);

    OutputView.printLottoCount(lottoNumbers.length);
    OutputView.printLottoNumbers(lottoNumbers);

    return { buyLottoPrice, lottoNumbers };
  }

  /**
   * @param {import('../types/jsDoc.js').BuyLottoDetail} buyLottoDetail - 로또 구입 금액과 로또 번호
   * @returns {Promise<void>}
   */
  async #processDrawLottoResult({ buyLottoPrice, lottoNumbers }) {
    const { winningNumber, bonusNumber } = await this.#requireWinningDetail();
    const winningRank = new WinningRank({ winningNumber, bonusNumber, lottoNumbers });
    const winningRankResult = winningRank.calculateRank();

    const rateOfReturnCalculator = new RateOfReturnCalculator({ buyLottoPrice, winningRankResult });
    const rateOfReturn = rateOfReturnCalculator.execute();

    OutputView.printDrawLottoResult({ rateOfReturn, winningRankResult });
  }

  /**
   * @returns {Promise<Omit<import('../types/jsDoc.js').LottoDrawDetail, 'lottoNumbers'>>} - 당첨 번호와 보너스 번호 속성이 있는 객체의 Promise
   */
  async #requireWinningDetail() {
    const winningNumber = await RetryHandler.errorWithLogging(() => InputView.readWinningNumber());
    const bonusNumber = await RetryHandler.errorWithLogging(() =>
      InputView.readBonusNumber(winningNumber),
    );

    return { winningNumber, bonusNumber };
  }

  /**
   * @returns {Promise<void>}
   */
  async #processRetryGame() {
    const retryCommand = await RetryHandler.errorWithLogging(() => InputView.readRetryCommand());

    if (this.#retryCommands.includes(retryCommand)) await this.run();
  }
}

export default LottoGameController;
