import NUMBER from '../constants/number';
import InputView from '../view/InputView';
import OutputView from '../view/OutputView';
import LottoValidation from '../validation/lottoValidation';
import RestartResponseValidation from '../validation/responseValidation';
import LottoPublisher from '../domain/LottoPublisher';
import MoneyValidation from '../validation/moneyValidation';
import WinLotto from '../domain/WinLotto';
import LottoProcess from '../domain/LottoProcess';
import LottoCalculator from '../domain/LottoCalculator';
import {RESPONSE} from '../constants/input';

/**
 * @module LottoConsoleController 로또의 관련 도메인과 뷰를 연결하여 게임을 컨트롤하는 컨트롤러 모듈입니다.
 */

class LottoConsoleController {
  async play() {
    const lottoCount = await this.getValidateLottoAmount();
    const [lottos, lottosNumbers] = await this.buyRandomLottos(lottoCount);
    this.showLottosInfo(lottoCount, lottosNumbers);

    const winLotto = await this.makeWinLotto();
    const lottoProcess = new LottoProcess();
    const winResult = lottoProcess.getResult(lottos, winLotto);

    this.showLottoResult(winResult, lottoCount);
    const restartResponse = await this.getValidateRestartResponse();
    if (restartResponse === RESPONSE.RESTART.YES) {
      await this.play();
    }
  }

  async buyRandomLottos(lottoCount) {
    const lottoPublisher = new LottoPublisher(lottoCount, []);
    const lottos = lottoPublisher.publishLottos();
    const lottoNumbers = lottoPublisher.lottoNumbers;
    return [lottos, lottoNumbers];
  }

  async makeWinLotto() {
    try {
      const winNumbersInput = await InputView.askWinNumbers();
      const winNumbers = winNumbersInput.split(',').map((e) => Number(e));
      const winLottoPublisher = new LottoPublisher(1, [winNumbers]);
      const [lottoWithWinNumbers] = winLottoPublisher.publishLottos();
      return await this.getValidateBonusNumber(lottoWithWinNumbers);
    } catch ({ message }) {
      console.log(message);
      return this.makeWinLotto();
    }
  }

  showLottosInfo(lottoCount, lottosNumbers) {
    OutputView.printLottoCount(lottoCount);
    OutputView.printRandomLottos(lottosNumbers);
  }

  showLottoResult(winResult, lottoCount) {
    OutputView.printResultTitle();
    OutputView.printWinningStatistics(winResult);
    const lottoCalculator = new LottoCalculator();
    const rateOfRevenue = lottoCalculator.getRateOfRevenue(winResult, lottoCount);
    OutputView.printRateOfRevenue(rateOfRevenue);
  }

  async getValidateLottoAmount() {
    const purchaseAmount = await InputView.askPurchaseAmount();
    try {
      MoneyValidation.validate(purchaseAmount);
    } catch ({ message }) {
      console.log(message);
      return this.getValidateLottoAmount();
    }
    return Number.parseInt(purchaseAmount / NUMBER.LOTTO_PRICE, 10);
  }

  async getValidateWinNumbers() {
    const winNumbers = await InputView.askWinNumbers().split(',');
    try {
      LottoValidation.validateNumbers(winNumbers);
    } catch ({ message }) {
      console.log(message);
      return this.getValidateWinNumbers();
    }
    return winNumbers;
  }

  async getValidateBonusNumber(lottoWithWinNumbers) {
    let winLotto;
    try {
      const bonusNumberInput = await InputView.askBonusNumber();
      winLotto = new WinLotto(lottoWithWinNumbers, Number(bonusNumberInput));
    } catch ({ message }) {
      console.log(message);
      return this.getValidateBonusNumber(lottoWithWinNumbers);
    }
    return winLotto;
  }

  async getValidateRestartResponse() {
    const restartResponse = await InputView.askRestart();
    try {
      RestartResponseValidation.validate(restartResponse);
    } catch ({ message }) {
      console.log(message);
      return this.getValidateRestartResponse();
    }
    return restartResponse;
  }
}

export default LottoConsoleController;
