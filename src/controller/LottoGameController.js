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
    const { buyLottoPrice, lottoNumbersArray } = await this.#processBuyLotto();

    await this.#processRaffleLottoResult({ buyLottoPrice, lottoNumbersArray });

    await this.#processRetryGame();
  }

  /**
   * @returns {Promise<import('../types/jsDoc.js').BuyLottoDetail>} 로또 구입 금액과 로또 번호 속성이 있는 객체의 Promise
   */
  async #processBuyLotto() {
    const buyLottoPrice = await RetryHandler.errorWithLogging(() => InputView.readBuyLottoPrice());
    const lottoBuyer = new LottoBuyer(buyLottoPrice);
    const lottoNumbersArray = lottoBuyer.purchase(buyLottoPrice);

    OutputView.printLottoCount(lottoNumbersArray.length);
    OutputView.printLottoNumbersArray(lottoNumbersArray);

    return { buyLottoPrice, lottoNumbersArray };
  }

  /**
   * @param {import('../types/jsDoc.js').BuyLottoDetail} buyLottoDetail - 로또 구입 금액과 로또 번호
   * @returns {Promise<void>}
   */
  async #processRaffleLottoResult({ buyLottoPrice, lottoNumbersArray }) {
    const { winningNumbers, bonusNumber } = await this.#requireWinningDetail();
    const winningRank = new WinningRank({ winningNumbers, bonusNumber, lottoNumbersArray });
    const winningRankResult = winningRank.calculateRank();

    const rateOfReturnCalculator = new RateOfReturnCalculator({ buyLottoPrice, winningRankResult });
    const rateOfReturn = rateOfReturnCalculator.execute();

    OutputView.printRaffleLottoResult({ rateOfReturn, winningRankResult });
  }

  /**
   * @returns {Promise<Omit<import('../types/jsDoc.js').LottoDrawDetail, 'lottoNumbers'>>} - 당첨 번호와 보너스 번호 속성이 있는 객체의 Promise
   */
  async #requireWinningDetail() {
    const winningNumbers = await RetryHandler.errorWithLogging(() =>
      InputView.readWinningNumbers(),
    );
    const bonusNumber = await RetryHandler.errorWithLogging(() =>
      InputView.readBonusNumber(winningNumbers),
    );

    return { winningNumbers, bonusNumber };
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
