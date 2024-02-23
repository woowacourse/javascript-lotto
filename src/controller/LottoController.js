import NUMBER from '../constants/number';
import Lotto from '../domain/Lotto';
import LottoProcess from '../domain/LottoProcess';
import Random from '../util/Random';
import InputView from '../view/InputView';
import OutputView from '../view/OutputView';
import LottoValidation from '../validation/lottoValidation';
import PurchaseAmountValidation from '../validation/purchaseAmount';
import RestartResponseValidation from '../validation/responseValidation';
import MESSAGE from '../constants/message';

class LottoController {
  async play() {
    //로또를 산다.
    const lottos = await this.buyLottos();
    const lottosNumbers = lottos.map((lotto) => lotto.getNumbers());
    //로또들의 정보를 반환한다.
    this.showLottosInfo(lottoCount, lottosNumbers);
    //우승 로또와 보너스 넘버를 받는다.
    const [winNumbers, bonusNumber] = await this.makeWinningNumbers(lottoProcess);
    //로또의 당첨여부를 받는다.
    const lottoProcess = new LottoProcess(lottos);
    const result = lottoProcess.getResult(winLotto, bonusNumber);
    await this.showLottoResult(lottoProcess, lottoCount);
    const restartResponse = await this.getValidateRestartResponse();
    if (restartResponse === MESSAGE.RESPONSE.RESTART.YES) {
      await this.play();
    }
  }

  //로또를 산다
  // 로또들을 반환한다.
  async buyLottos() {
    const lottoCount = await this.getValidateLottoAmount();
    const lottos = this.publishRandomLottos(lottoCount);
    return lottos;
  }

  publishRandomLottos(count) {
    const lottoNumbers = [];
    const lottos = [];
    for (let i = 0; i < lottoCount; i++) {
      const randomNumbers = this.getRandomNumbers();
      lottoNumbers.push(randomNumbers);
      lottos.push(new Lotto(randomNumbers));
      return Array.from({ length: count }, () => new Lotto(this.getRandomNumbers()));
    }
    return lottos;
  }

  showLottosInfo(lottoCount, lottosNumbers) {
    OutputView.printLottoCount(lottoCount);
    OutputView.printRandomLottos(lottosNumbers);
  }

  async makeWinningNumbers() {
    const winNumbers = await this.getValidateWinNumbers();
    // const winLotto = new Lotto(winNumbers);
    const bonusNumber = await this.validateBonusNumber(winNumbers);
    return [winNumbers, bonusNumber];
    //const result = lottoProcess.getResult(winLotto, bonusNumber);

    // await this.showLottoResult(lottoProcess, lottoCount);
  }

  async showLottoResult(lottoProcess, lottoCount) {
    OutputView.printResultTitle();
    const result = [0, 0, 0, 0, 0];
    OutputView.printWinningStatistics(result);
    const rateOfRevenue = this.getRateOfRevenue(result, lottoCount);
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
    const revenue = result.reduce((acc, cur) => {
      const [, , price, winCount] = cur;
      return acc + price * winCount;
    }, 0);

    return ((revenue / (lottoCount * NUMBER.LOTTO_PRICE)) * 100).toFixed(1);
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
