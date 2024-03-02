import NUMBER from '../constants/number';
import LottoCalculator from '../domain/LottoCalculator';
import LottoProcess from '../domain/LottoProcess';
import LottoPublisher from '../domain/LottoPublisher';
import { $, $$ } from '../util/domSelector';
import { focusElement, hideElement, renderError, resetElementValue } from '../util/view';
import LottoValidation from '../validation/lottoValidation';
import MoneyValidation from '../validation/moneyValidation';
import LottoResultModalView from '../view/web/lottoResultModalView';
import MyLottoInfoView from '../view/web/MyLottoInfoView';
import WinLottoView from '../view/web/WinLottoView';

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
      LottoResultModalView.resetModal();
    });

    $('#close-modal-button').addEventListener('click', () => {
      LottoResultModalView.resetModal();
    });

    $('#money-input').addEventListener('input', () => {
      if ($('#money-error')) hideElement($('#money-error'));
    });

    [...$$('.number-input')].forEach((input) => {
      input.addEventListener('input', () => {
        if ($('#win-lotto-error')) hideElement($('#win-lotto-error'));
      });
    });
  }

  /*로또 구입 금액 제출 섹션*/
  validateMoney(money) {
    const moneyInput = $('#money-input');
    try {
      MoneyValidation.validate(money);
      return money;
    } catch ({ message }) {
      focusElement(moneyInput);
      resetElementValue(moneyInput);
      MyLottoInfoView.hideSection();
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
    resetElementValue($('money-input'));
    WinLottoView.resetWinningLottoNumbers();
  }

  /*구입한 로또 정보 섹션*/
  showLottosInfo(lottosNumbers) {
    MyLottoInfoView.renderSection();
    MyLottoInfoView.renderLottosCount(lottosNumbers.length);
    MyLottoInfoView.renderLottosNumbers(lottosNumbers);
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
    LottoResultModalView.renderSection();
  }

  showWinStatisticTable(winResult) {
    LottoResultModalView.renderSection();
    LottoResultModalView.renderWinResultTable(winResult);
  }

  showRateOfReturn(rateOfRevenue) {
    LottoResultModalView.renderReturnOfRatio(rateOfRevenue);
  }

  restartLotto() {
    this.lottos = [];
    MyLottoInfoView.hideSection();
    LottoResultModalView.hideSection();
    MyLottoInfoView.deleteLottoInfo();
    LottoResultModalView.deleteModalInfo();
    $('#money-input').focus();
  }
}

export default LottoWebController;
