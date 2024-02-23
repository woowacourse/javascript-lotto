import NUMBER from '../constants/number';
import InputView from '../view/InputView';
import OutputView from '../view/OutputView';
import LottoValidation from '../validation/lottoValidation';
import RestartResponseValidation from '../validation/responseValidation';
import LottoPublisher from '../domain/LottoPublisher';
import MoneyValidation from '../validation/MoneyValidation';
import WinLotto from '../domain/WinLotto';
import LottoProcess from '../domain/LottoProcess';

class LottoController {
  async play() {
    //로또를 산다.
    const lottoCount = await this.getValidateLottoAmount();
    const [lottos, lottosNumbers] = await this.buyRandomLottos(lottoCount);
    //로또들의 정보를 반환한다.
    this.showLottosInfo(lottoCount, lottosNumbers);

    // //우승 로또와 보너스 넘버를 받는다.
    const winLotto = await this.makeWinLotto();
    // //로또의 당첨여부를 받는다.
    const lottoProcess = new LottoProcess();
    lottoProcess.getResult(lottos, winLotto);

    // const result = lottoProcess.getResult(winLotto, bonusNumber);
    // await this.showLottoResult(lottoProcess, lottoCount);
    const restartResponse = await this.getValidateRestartResponse();
    if (restartResponse === MESSAGE.RESPONSE.RESTART.YES) {
      await this.play();
    }
  }
  //로또를 산다
  // 로또들을 반환한다.
  async buyRandomLottos(lottoCount) {
    const lottoPublisher = new LottoPublisher(lottoCount, []);
    const lottos = lottoPublisher.publishLottos();
    const lottoNumbers = lottoPublisher.lottoNumbers;
    return [lottos, lottoNumbers];
  }

  showLottosInfo(lottoCount, lottosNumbers) {
    OutputView.printLottoCount(lottoCount);
    OutputView.printRandomLottos(lottosNumbers);
  }

  async makeWinLotto() {
    let winLotto;
    try {
      const winNumbersInput = await InputView.askWinNumbers();
      const winNumbers = winNumbersInput.split(',').map((e) => Number(e));
      const winLottoPublisher = new LottoPublisher(1, [winNumbers]);
      const lottoWithWinNumbers = winLottoPublisher.publishLottos()[0];
      winLotto = await this.getValidateBonusNumber(lottoWithWinNumbers);
    } catch (error) {
      OutputView.printError(error.message);
      return this.makeWinLotto();
    }
    return winLotto;
  }

  async getValidateBonusNumber(lottoWithWinNumbers) {
    let winLotto;
    try {
      const bonusNumberInput = await InputView.askBonusNumber();
      winLotto = new WinLotto(lottoWithWinNumbers, Number(bonusNumberInput));
    } catch (error) {
      OutputView.printError(error.message);
      return this.getValidateBonusNumber(lottoWithWinNumbers);
    }
    return winLotto;
  }

  async showLottoResult(lottoProcess, lottoCount) {
    OutputView.printResultTitle();
    const result = [0, 0, 0, 0, 0];
    OutputView.printWinningStatistics(result);
    const rateOfRevenue = this.getRateOfRevenue(result, lottoCount);
    OutputView.printRateOfRevenue(rateOfRevenue);
  }

  getRateOfRevenue(result = 0, lottoCount = 0) {
    const revenue = result.reduce((acc, cur) => {
      const [, , price, winCount] = cur;
      return acc + price * winCount;
    }, 0);

    return ((revenue / (lottoCount * NUMBER.LOTTO_PRICE)) * 100).toFixed(1);
  }

  async getValidateLottoAmount() {
    const purchaseAmount = await InputView.askPurchaseAmount();
    try {
      MoneyValidation.validate(purchaseAmount);
    } catch (error) {
      OutputView.printError(error.message);
      return this.getValidateLottoAmount();
    }
    return Number.parseInt(purchaseAmount / NUMBER.LOTTO_PRICE, 10);
  }

  async getValidateWinNumbers() {
    const winNumbers = await InputView.askWinNumbers().split(',');
    try {
      LottoValidation.validateNumbers(winNumbers);
    } catch (error) {
      OutputView.printError(error.message);
      return this.getValidateWinNumbers();
    }
    return winNumbers;
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
