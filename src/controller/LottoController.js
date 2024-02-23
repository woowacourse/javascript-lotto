import NUMBER from '../constants/number';
import LottoProcess from '../domain/LottoProcess';
import InputView from '../view/InputView';
import OutputView from '../view/OutputView';
import LottoValidation from '../validation/lottoValidation';
import RestartResponseValidation from '../validation/responseValidation';
import LottoPublisher from '../domain/LottoPublisher';
import LottoChecker from '../domain/LottoChecker';
import WinLotto from '../domain/WinningLotto';
import MoneyValidation from '../validation/MoneyValidation';

class LottoController {
  async play() {
    //로또를 산다.
    const lottoPublisher = new LottoPublisher();
    const lottoCount = await this.getValidateLottoAmount();
    const [lottos, lottosNumbers] = await this.buyRandomLottos(lottoCount);
    //로또들의 정보를 반환한다.
    this.showLottosInfo(lottoCount, lottosNumbers);

    // //우승 로또와 보너스 넘버를 받는다.
    // const [winNumbers, bonusNumber] = await this.makeWinningNumbers(lottoPublisher);
    // //로또의 당첨여부를 받는다.
    // const lottoChecker = new LottoChecker();
    // lottoChecker.getResult();
    // // const lottoProcess = new LottoProcess(lottos);
    // // const result = lottoProcess.getResult(winLotto, bonusNumber);
    // // await this.showLottoResult(lottoProcess, lottoCount);
    // const restartResponse = await this.getValidateRestartResponse();
    // if (restartResponse === MESSAGE.RESPONSE.RESTART.YES) {
    //   await this.play();
    // }
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

  async makeWinLotto(lottoPublisher) {
    const lottoWithWinNumbers = this.buyLottos(lottoPublisher, 1);
    const bonusNumber = await InputView.askBonusNumber();
    try {
      const winLotto = new WinLotto(lottoWithWinNumbers, bonusNumber);
    } catch (error) {
      OutputView.printError(error.message);
      return this.makeWinLotto(lottoPublisher);
    }
    return winLotto;
    // const winNumbers = await this.getValidateWinNumbers();

    // const winLotto = new Lotto(winNumbers);
    // const bonusNumber = await this.getValidateBonusNumber(winNumbers);
    // return [winNumbers, bonusNumber];

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
    const winNumbers = await InputView.askWinNumbers();
    try {
      LottoValidation.validateNumbers(winNumbers);
    } catch (error) {
      OutputView.printError(error.message);
      return this.getValidateWinNumbers();
    }
    return winNumbers;
  }

  // async getValidateBonusNumber(winNumbers) {
  //   const bonusNumber = await InputView.askBonusNumber();
  //   try {
  //     LottoValidation.validateBonusNumber(winNumbers, bonusNumber);
  //   } catch (error) {
  //     OutputView.printError(error.message);
  //     return this.getValidateBonusNumber();
  //   }
  //   return bonusNumber;
  // }

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
