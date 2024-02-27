import { ERROR_MESSAGE, OUTPUT_MESSAGE } from '../constants/message';
import NUMBER from '../constants/number';
import WINNER from '../constants/winner';
import Lotto from '../domain/Lotto';
import LottoCalculator from '../domain/LottoCalculator';
import LottoProcess from '../domain/LottoProcess';
import LottoPublisher from '../domain/LottoPublisher';
import WinLotto from '../domain/WinLotto';
import { $, $$ } from '../util/domSelector';
import { printError } from '../util/view';
import LottoValidation from '../validation/lottoValidation';
import MoneyValidation from '../validation/moneyValidation';
import MyLottoOutputView from '../view/web/MyLottoOutputView';
import WebInputView from '../view/web/WebInputView';

class LottoWebController {
  constructor() {
    this.lottos;
  }
  play() {
    $('#money-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const [lottos, lottosNumbers] = this.getValidateLottoAmount();
      this.lottos = lottos;
      const lottoCount = lottos.length;
      this.showLottosInfo(lottoCount, lottosNumbers);
    });
    $('#money-input').addEventListener('input', () => {
      $('#money-error').classList.add('hidden');
    });
    $('#winning-lotto-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const winLotto = this.submitWinLotto();
      const winResult = this.getResult(this.lottos, winLotto);
      this.makeWinStatisticTable(winResult);
      const lottoCalculator = new LottoCalculator();
      const lottosCount = this.lottos.length;
      const rateOfRevenue = lottoCalculator.getRateOfRevenue(winResult, lottosCount);
      this.showRateOfReturn(rateOfRevenue);
    });

    //TODO: 에러 메세지 숨기는 부분 유틸 분리
    [...$$('.number-input')].forEach((input) => {
      input.addEventListener('input', () => {
        $('#win-lotto-error').classList.add('hidden');
      });
    });
    $('#lotto-game-restart-button').addEventListener('click', () => {
      this.resetLottoGame();
    });
  }

  getValidateLottoAmount() {
    try {
      MoneyValidation.validate($('#money-input').value);
      const lottosCount = Number.parseInt($('#money-input').value / NUMBER.LOTTO_PRICE, 10);
      return this.buyRandomLottos(lottosCount);
    } catch ({ message }) {
      WebInputView.resetMoneyInput();
      printError($('#money-error'), message);
    }
  }

  buyRandomLottos(lottoCount) {
    $('#money-input').value = '';
    const lottoPublisher = new LottoPublisher(lottoCount, []);
    const lottos = lottoPublisher.publishLottos();
    const lottoNumbers = lottoPublisher.lottoNumbers;
    return [lottos, lottoNumbers];
  }

  showLottosInfo(lottoCount, lottosNumbers) {
    MyLottoOutputView.renderSection();
    MyLottoOutputView.renderLottosInfo(lottoCount, lottosNumbers);
    $('.number-input').focus();
  }

  getWinLottoNumbers() {
    const numberInputs = [...$$('.number-input')];
    //TODO: 모든 수가 다 입력되어 있는지 확인
    LottoValidation.checkInputEmpty(numberInputs);

    const bonusNumberInput = numberInputs.splice(-1, 1);
    const winNumbers = numberInputs.reduce((numbers, input) => {
      numbers.push(Number(input.value));
      return numbers;
    }, []);
    const bonusNumber = Number(bonusNumberInput[0].value);
    return [winNumbers, bonusNumber];
  }

  checkInputEmpty(inputs) {
    inputs.some((input) => {
      if (!input.value.length) {
        throw new Error(ERROR_MESSAGE.SOME_INPUT_EMPTY);
      }
    });
  }

  getValidateWinNumbers(winNumbers, bonusNumber) {
    LottoValidation.validateNumbers(winNumbers);
    const lottoWithWinNumbers = new Lotto(winNumbers);
    const winLotto = new WinLotto(lottoWithWinNumbers, Number(bonusNumber));
    return winLotto;
  }
  //TODO: 함수 분리
  submitWinLotto() {
    try {
      const [winNumbers, bonusNumber] = this.getWinLottoNumbers();
      const newLotto = this.getValidateWinNumbers(winNumbers, bonusNumber);
      return newLotto;
    } catch ({ message }) {
      WebOutputView.printError($('#win-lotto-error'), message);
    }
    $$('.number-input').forEach((input) => (input.value = ''));
    $('.number-input').focus();
  }

  makeWinStatisticTable(result) {
    $('#winning-statistics-modal').classList.remove('hidden');
    this.makeResultTable(result);
  }

  getResult(lottos, winLotto) {
    const lottoProcess = new LottoProcess();
    const winResult = lottoProcess.getResult(lottos, winLotto);
    return winResult;
  }

  showRateOfReturn(rateOfRevenue) {
    $('#lotto-return-ratio').innerText = `당신의 총 수익률은 ${rateOfRevenue}%입니다.`;
  }

  //TODO: VIew 로 이동
  makeResultTable(winningResults) {
    const innerHTML = winningResults.map((_, index) => {
      const rankIndex = Math.abs(Object.keys(WINNER).length - index);
      return `
      <tr>
      <td>${OUTPUT_MESSAGE.WEB_BALL_COUNT(WINNER[rankIndex].MATCH_COUNT)}${
        WINNER[rankIndex].IS_BONUS ? OUTPUT_MESSAGE.WEB_BONUS_MATH : ''
      }</td>
      <td>${OUTPUT_MESSAGE.WEB_WIN_PRICE(WINNER[rankIndex].PRICE)}</td>
      <td>${OUTPUT_MESSAGE.WEB_BALL_COUNT(winningResults[rankIndex - 1])}</td>
    </tr>`;
    });
    $('#winning-statistics-table').insertAdjacentHTML('beforeend', innerHTML.join(''));
  }
}
export default LottoWebController;
