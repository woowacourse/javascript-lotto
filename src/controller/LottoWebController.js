import NUMBER from '../constants/number';
import LottoCalculator from '../domain/LottoCalculator';
import LottoProcess from '../domain/LottoProcess';
import LottoPublisher from '../domain/LottoPublisher';
import { $, $$ } from '../util/domSelector';
import { hideElement, hideError, renderError } from '../util/view';
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
    });

    $('#winning-lotto-form').addEventListener('submit', (e) => {
      e.preventDefault();
      this.submitWinLotto();
    });

    $('#lotto-game-restart-button').addEventListener('click', () => {
      this.restartLotto();
    });

    $('.modal-background').addEventListener('click', () => {
      ModalOutputView.resetModal();
    });

    $('#close-modal-button').addEventListener('click', () => {
      ModalOutputView.resetModal();
    });

    $('#money-input').addEventListener('input', () => {
      hideElement($('#money-erorr'));
    });

    [...$$('.number-input')].forEach((input) => {
      input.addEventListener('input', () => {
        hideElement($('#win-lotto-error'));
      });
    });
  }

  /*로또 구입 금액 제출 섹션*/
  validateMoney(money) {
    try {
      MoneyValidation.validate(money);
      return money;
    } catch ({ message }) {
      WebInputView.focusMoneyInput();
      WebInputView.resetMoneyInput();
      MyLottoOutputView.hideSection();
      renderError($('#money-error'), message);
    }
  }

  convertMoneyToLotto(money) {
    const lottosCount = Number.parseInt(money / NUMBER.LOTTO_PRICE, 10);

    const lottoPublisher = new LottoPublisher(lottosCount, []);
    const lottos = lottoPublisher.publishLottos();
    const lottosNumbers = lottoPublisher.lottoNumbers;

    this.lottos = lottos;
    return lottosNumbers;
  }

  submitMoneyForm(money) {
    const validMoney = this.validateMoney(money);
    if (validMoney) {
      const lottosNumbers = this.convertMoneyToLotto(validMoney);
      this.showLottosInfo(lottosNumbers);
    }
    WebInputView.resetMoneyInput();
    WebInputView.resetWinningLottoNumbers();
  }

  /*구입한 로또 정보 섹션*/
  showLottosInfo(lottosNumbers) {
    MyLottoOutputView.renderSection();
    MyLottoOutputView.renderLottosCount(lottosNumbers.length);
    MyLottoOutputView.renderLottosNumbers(lottosNumbers);
    $('.number-input').focus();
  }

  /*우승 로또 숫자 입력 섹션*/
  getWinLottoNumbers() {
    const numberInputs = [...$$('.number-input')];
    const bonusNumberInput = numberInputs.splice(-1, 1);

    const winNumbers = numberInputs.reduce((numbers, input) => {
      numbers.push(Number(input.value));
      return numbers;
    }, []);
    const bonusNumber = Number(bonusNumberInput[0].value);
    return [winNumbers, bonusNumber];
  }

  makeWinLotto(winNumbers, bonusNumber) {
    LottoValidation.validateNumbers(winNumbers);
    const lottoPublisher = new LottoPublisher(1, winNumbers);
    const winLotto = lottoPublisher.publishWinLotto(bonusNumber);
    return winLotto;
  }

  submitWinLotto() {
    try {
      const numberInputs = [...$$('.number-input')];
      LottoValidation.checkInputEmpty(numberInputs);

      const [winNumbers, bonusNumber] = this.getWinLottoNumbers();
      const winLotto = this.makeWinLotto(winNumbers, bonusNumber);
      this.showWinResults(winLotto);
    } catch ({ message }) {
      renderError($('#win-lotto-error'), message);
    }
  }

  /*로또 우승 통계 모달 섹션*/
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

  showWinResults(winLotto) {
    const winResult = this.makeWinResult(this.lottos, winLotto);
    this.showWinStatisticTable(winResult);
    const rateOfRevenue = this.makeRateOfRevenue(winResult, this.lottos.length);
    this.showRateOfReturn(rateOfRevenue);
    ModalOutputView.renderSection();
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
