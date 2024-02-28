import { ERROR_MESSAGE, OUTPUT_MESSAGE } from '../constants/message';
import NUMBER from '../constants/number';
import WINNER from '../constants/winner';
import Lotto from '../domain/Lotto';
import LottoCalculator from '../domain/LottoCalculator';
import LottoProcess from '../domain/LottoProcess';
import LottoPublisher from '../domain/LottoPublisher';
import WinLotto from '../domain/WinLotto';
import { $, $$ } from '../util/domSelector';
import { hideElement, renderError } from '../util/view';
import LottoValidation from '../validation/lottoValidation';
import MoneyValidation from '../validation/moneyValidation';
import ModalOutputView from '../view/web/ModalOutputView';
import MyLottoOutputView from '../view/web/MyLottoOutputView';
import WebInputView from '../view/web/WebInputView';

class LottoWebController {
  constructor() {
    this.lottos = [];
  }

  play() {
    $('#money-form').addEventListener('submit', (e) => {
      e.preventDefault();
      this.submitMoneyForm($('#money-input').value);
      WebInputView.resetWinningLottoNumbers();
    });
    // $('#money-input').addEventListener('input', () => {
    //   hideElement($('#money-error'));
    // });
    $('#winning-lotto-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const winLotto = this.submitWinLotto();
      this.calculateWinResults(winLotto);
      ModalOutputView.renderSection();
    });

    [...$$('.number-input')].forEach((input) => {
      input.addEventListener('input', () => {
        hideElement($('#win-lotto-error'));
      });
    });
    $('#lotto-game-restart-button').addEventListener('click', () => {
      this.restartLotto();
    });
    $('.modal-background').addEventListener('click', () => {
      ModalOutputView.deleteModalInfo();
      ModalOutputView.hideSection();
    });
    $('#close-modal-button').addEventListener('click', () => {
      ModalOutputView.deleteModalInfo();
      ModalOutputView.hideSection();
    });
    [...document.getElementsByTagName('input')].forEach((input) => {
      input.addEventListener('input', () => {
        WebInputView.hiddenInputsErrors(); // 이 함수가 올바르게 정의되어 있고 접근 가능해야 합니다.
      });
    });
  }

  validateMoney(money) {
    MoneyValidation.validate(money);
  }

  submitMoneyForm(money) {
    try {
      this.validateMoney(money);
      const [lottos, lottosNumbers] = this.convertMoneyToLotto(money);
      this.lottos = lottos;
      this.showLottosInfo(lottosNumbers);
    } catch ({ message }) {
      WebInputView.focusMoneyInput();
      MyLottoOutputView.hideSection();
      renderError($('#money-error'), message);
    }
    WebInputView.resetMoneyInput();
  }

  convertMoneyToLotto(money) {
    const lottosCount = Number.parseInt(money / NUMBER.LOTTO_PRICE, 10);
    const [lottos, lottosNumbers] = this.buyRandomLottos(lottosCount);
    return [lottos, lottosNumbers];
  }

  buyRandomLottos(lottoCount) {
    const lottoPublisher = new LottoPublisher(lottoCount, []);
    const lottos = lottoPublisher.publishLottos();
    const lottoNumbers = lottoPublisher.lottoNumbers;
    return [lottos, lottoNumbers];
  }

  showLottosInfo(lottosNumbers) {
    MyLottoOutputView.renderSection();
    MyLottoOutputView.renderLottosCount(lottosNumbers.length);
    MyLottoOutputView.renderLottosNumbers(lottosNumbers);
    $('.number-input').focus();
  }

  makeWinLotto(winNumbers, bonusNumber) {
    LottoValidation.validateNumbers(winNumbers);
    const lottoWithWinNumbers = new Lotto(winNumbers);
    const winLotto = new WinLotto(lottoWithWinNumbers, Number(bonusNumber));
    return winLotto;
  }

  getWinLottoNumbers() {
    const numberInputs = [...$$('.number-input')];
    LottoValidation.checkInputEmpty(numberInputs);

    const bonusNumberInput = numberInputs.splice(-1, 1);
    const winNumbers = numberInputs.reduce((numbers, input) => {
      numbers.push(Number(input.value));
      return numbers;
    }, []);
    const bonusNumber = Number(bonusNumberInput[0].value);
    return [winNumbers, bonusNumber];
  }

  submitWinLotto() {
    try {
      const [winNumbers, bonusNumber] = this.getWinLottoNumbers();
      const newLotto = this.makeWinLotto(winNumbers, bonusNumber);
      return newLotto;
    } catch ({ message }) {
      renderError($('#win-lotto-error'), message);
    }
  }

  calculateWinResults(winLotto) {
    const winResult = this.makeWinResult(this.lottos, winLotto);
    this.showWinStatisticTable(winResult);
    const rateOfRevenue = this.makeRateOfRevenue(winResult, this.lottos.length);
    this.showRateOfReturn(rateOfRevenue);
  }

  makeWinResult(lottos, winLotto) {
    const lottoProcess = new LottoProcess();
    const winResult = lottoProcess.getResult(lottos, winLotto);
    return winResult;
  }

  makeRateOfRevenue(winResult, lottosCount) {
    const lottoCalculator = new LottoCalculator();
    const rateOfRevenue = lottoCalculator.getRateOfRevenue(winResult, lottosCount);
    return rateOfRevenue;
  }

  showWinStatisticTable(winResult) {
    ModalOutputView.renderSection();
    ModalOutputView.renderWinResultTable(winResult);
  }

  showRateOfReturn(rateOfRevenue) {
    ModalOutputView.renderReturnOfRatio(rateOfRevenue);
  }

  restartLotto() {
    this.lottos = [];
    MyLottoOutputView.hideSection();
    ModalOutputView.hideSection();
    MyLottoOutputView.deleteLottoInfo();
    ModalOutputView.deleteModalInfo();
    $('#money-input').focus();
  }
}
export default LottoWebController;
