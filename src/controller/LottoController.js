import NUMBER from '../constants/number';
import Lotto from '../domain/Lotto';
import InputView from '../view/InputView';
import OutputView from '../view/OutputView';
import LottoValidation from '../validation/lottoValidation';
import PurchaseAmountValidation from '../validation/purchaseAmount';
import RestartResponseValidation from '../validation/responseValidation';
import { RESPONSE_MESSAGE } from '../constants/message';
import LottoService from '../domain/LottoService';
import retryErrorCatch from '../util/retryErrorCatch';

class LottoController {
  async play() {
    const [randomLottos, lottoCount] = await this.buyRandomLottos();
    const [winLotto, bonusNumber] = await this.inputWinnerInfo();
    const [result, rateOfRevenue] = LottoService.calculateResult({randomLottos, winLotto, bonusNumber, lottoCount})
    this.showLottoResult(result, rateOfRevenue);
    const restartResponse = await retryErrorCatch(() => this.getValidateRestartResponse());
    if (restartResponse === RESPONSE_MESSAGE.RESTART.YES) {
      await this.play();
    }
  }

  async buyRandomLottos() {
    const lottoCount = await retryErrorCatch(() => this.getValidateLottoAmount());
    const randomLottos = LottoService.getLottos(lottoCount);
    OutputView.printLottoCount(lottoCount);
    OutputView.printRandomLottos(randomLottos);

    return [randomLottos, lottoCount];
  }

  async inputWinnerInfo() {
    const winNumbers = await retryErrorCatch(() => this.getValidateWinNumbers());
    const winLotto = new Lotto(winNumbers);
    const bonusNumber = await retryErrorCatch(() => this.validateBonusNumber(winNumbers));

    return [winLotto, bonusNumber];
  }

  showLottoResult(result = [], rateOfRevenue = 0) {
    OutputView.printResultTitle();
    OutputView.printWinningStatistics(result);
    OutputView.printRateOfRevenue(rateOfRevenue);
  }

  async getValidateLottoAmount() {
    const purchaseAmount = await InputView.askPurchaseAmount();
    PurchaseAmountValidation.validate(purchaseAmount);
    
    return Number.parseInt(purchaseAmount / NUMBER.LOTTO_PRICE, 10);
  }

  async getValidateWinNumbers() {
    const winNumbersString = await InputView.askWinNumbers();
    const winNumbers = winNumbersString.split(',').map((number) => Number(number));
    LottoValidation.validateNumbers(winNumbers);
    
    return winNumbers;
  }

  async validateBonusNumber(winNumbers) {
    const bonusNumber = await InputView.askBonusNumber();
    LottoValidation.validateBonusNumber(winNumbers, bonusNumber);

    return bonusNumber;
  }

  async getValidateRestartResponse() {
    const restartResponse = await InputView.askRestart();
    RestartResponseValidation.validate(restartResponse);

    return restartResponse;
  }
}
export default LottoController;
