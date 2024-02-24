import NUMBER from '../constants/number';
import Lotto from '../domain/Lotto';
import LottoProcess from '../domain/LottoProcess';
import Random from '../util/Random';
import InputView from '../view/InputView';
import OutputView from '../view/OutputView';
import LottoValidation from '../validation/lottoValidation';
import PurchaseAmountValidation from '../validation/purchaseAmount';
import RestartResponseValidation from '../validation/responseValidation';
import { RESPONSE_MESSAGE } from '../constants/message';

class LottoController {
  async play() {
    await this.buyLottos();
    const restartResponse = await this.getValidateRestartResponse();
    if (restartResponse === RESPONSE_MESSAGE.RESTART.YES) {
      await this.play();
    }
  }

  async buyLottos() {
    const lottoCount = await this.getValidateLottoAmount();
    const lottos = this.getLottos(lottoCount);
    const lottoProcess = new LottoProcess(lottos);

    await this.showRnadomLottos(lottoCount, lottoProcess);
  }

  async showRnadomLottos(lottoCount = 0, lottoProcess = {}) {
    const lottosNumbers = lottoProcess.getAllLottosNumbers();

    OutputView.printLottoCount(lottoCount);
    OutputView.printRandomLottos(lottosNumbers);
    await this.inputUserLottoInfo(lottoProcess, lottoCount);
  }

  async inputUserLottoInfo(lottoProcess = {}, lottoCount = 0) {
    const winNumbers = await this.getValidateWinNumbers();
    const winLotto = new Lotto(winNumbers);
    const bonusNumber = await this.validateBonusNumber(winNumbers);
    const result = lottoProcess.getResult(winLotto, bonusNumber);

    this.showLottoResult(result, lottoCount);
  }

  showLottoResult(result = [], lottoCount = 0) {
    const rateOfRevenue = this.getRateOfRevenue(result, lottoCount);

    OutputView.printResultTitle();
    OutputView.printWinningStatistics(result);
    OutputView.printRateOfRevenue(rateOfRevenue);
  }

  async getValidateLottoAmount() {
    const purchaseAmount = await InputView.askPurchaseAmount();
    try {
      PurchaseAmountValidation.validate(purchaseAmount);
    } catch (error) {
      OutputView.printError(error.message);
      return this.getValidateLottoAmount();
    }
    return Number.parseInt(purchaseAmount / NUMBER.LOTTO_PRICE, 10);
  }

  getRandomNumbers() {
    const numbers = new Set();
    while (numbers.size < NUMBER.LOTTO_LENGTH) {
      const randomNum = Random.pickNumberInRange(NUMBER.LOTTO_START_NUMBER, NUMBER.LOTTO_END_NUMBER);
      numbers.add(randomNum);
    }
    return Array.from(numbers);
  }

  async getValidateWinNumbers() {
    const winNumbers = await InputView.askWinNumbers();
    try {
      LottoValidation.validateNumbers(winNumbers);
    } catch (error) {
      OutputView.printError(error.message);
      return this.getValidateWinNumbers();
    }
    return winNumbers;
  }

  async validateBonusNumber(winNumbers) {
    const bonusNumber = await InputView.askBonusNumber();
    try {
      LottoValidation.validateBonusNumber(winNumbers, bonusNumber);
    } catch (error) {
      OutputView.printError(error.message);
      return this.validateBonusNumber();
    }
    return bonusNumber;
  }

  getRateOfRevenue(result = 0, lottoCount = 0) {
    const revenue = result.reduce((totalRevenue, eachResult) => {
      const [, , price, winCount] = eachResult;
      return totalRevenue + price * winCount;
    }, 0);

    return ((revenue / (lottoCount * NUMBER.LOTTO_PRICE)) * 100).toFixed(1);
  }

  getLottos(count) {
    return Array.from({ length: count }, () => new Lotto(this.getRandomNumbers()));
  }

  async getValidateRestartResponse() {
    const restartResponse = await InputView.askRestart();
    try {
      RestartResponseValidation.validate(restartResponse);
    } catch (error) {
      OutputView.printError(error.message);
      return this.getValidateRestartResponse();
    }
    return restartResponse;
  }
}
export default LottoController;
