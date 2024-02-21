import NUMBER from '../constants/number';
import Lotto from '../domain/Lotto';
import LottoProcess from '../domain/LottoProcess';
import Random from '../util/Random';
import InputView from '../view/InputView';
import OutputView from '../view/OutputView';
import LottoValidation from '../validation/lottoValidation';
import PurchaseAmountValidation from '../validation/purchaseAmount';

class LottoController {
  async play() {
    const lottoCount = await this.getValidateLottoAmount();
    const lottos = this.getLottos(lottoCount);
    const lottoProcess = new LottoProcess(lottos);
    const lottosNumbers = lottoProcess.getAllLottosNumbers();

    OutputView.printLottoCount(lottoCount);
    OutputView.printRandomLottos(lottosNumbers);

    const winLotto = new Lotto(await this.getValidateWinNumbers());
    const winNumbers = winLotto.getNumbers();
    const bonusNumber = await this.getValidateBonusNumber(winNumbers);
    const result = lottoProcess.getResult(winLotto, bonusNumber);
    OutputView.printResultTitle();
    OutputView.printWinningStatistics(result);
  }

  async getValidateLottoAmount() {
    const purchaseAmount = await InputView.askPurchaseAmount();
    try {
      PurchaseAmountValidation.validate(purchaseAmount);
    } catch (error) {
      OutputView.printError(error.message);
      await this.getValidateLottoAmount();
    }
    return Number.parseInt(purchaseAmount / NUMBER.LOTTO_PRICE, 10);
  }

  getRandomNumbers() {
    const lottoNumbers = [];
    while (lottoNumbers.length < NUMBER.LOTTO_LENGTH) {
      lottoNumbers.push(Random.pickNumberInRange(NUMBER.LOTTO_START_NUMBER, NUMBER.LOTTO_END_NUMBER));
    }
    if (new Set(lottoNumbers).size !== NUMBER.LOTTO_LENGTH) {
      return this.getRandomNumbers();
    }
    return [...lottoNumbers];
  }

  async getValidateWinNumbers() {
    const winNumbers = await InputView.askWinNumbers();
    try {
      LottoValidation.validateNumbers(winNumbers);
    } catch (error) {
      OutputView.printError(error.message);
      await this.getValidateWinNumbers();
    }
    return winNumbers;
  }

  async getValidateBonusNumber(winNumbers) {
    const bonusNumber = await InputView.askBonusNumber();
    try {
      LottoValidation.validateBonusNumber(winNumbers, bonusNumber);
    } catch (error) {
      OutputView.printError(error.message);
      await this.getValidateBonusNumber();
    }
  }

  getRateOfRevenue(result = 0, lottoCount = 0) {
    const revenue = result.reduce((acc, cur) => {
      const [, , price, winCount] = cur;
      return acc + price * winCount;
    }, 0);

    return ((revenue / (lottoCount * NUMBER.LOTTO_PRICE)) * 100).toFixed(1);
  }

  getLottos(count) {
    return Array.from({ length: count }, () => new Lotto(this.getRandomNumbers()));
  }
}
export default LottoController;
