import NUMBER from '../constants/number';
import Lotto from '../domain/Lotto';
import LottoPublisher from '../domain/LottoPublisher';
import WinLotto from '../domain/WinLotto';
import { $, $$ } from '../util/domSelector';
import MoneyValidation from '../validation/moneyValidation';
import WebOutputView from '../view/WebOutputView';

class LottoWebController {
  constructor() {
    this.numbers = [];
  }
  play() {
    $('#money-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const [lottos, lottosNumbers] = this.getValidateLottoAmount();
      const lottoCount = lottos.length;
      this.showLottosInfo(lottoCount, lottosNumbers);
    });
    $('#money-input').addEventListener('input', () => {
      $('#money-error').classList.add('hidden');
    });
    $('#winning-lotto-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const [winNumbers, bonusNumber] = this.getWinLottoNumbers();
      this.makeValidateWinLotto(winNumbers, bonusNumber);
    });
  }

  getValidateLottoAmount() {
    try {
      MoneyValidation.validate($('#money-input').value);
    } catch ({ message }) {
      // TODO: 유틸. 인풋 초기화 함수 생성
      $('#money-input').value = '';
      $('#money-input').focus();
      // TODO: 유틸일까? View일까?
      WebOutputView.printError($('#money-error'), message);
    }
    const lottosCount = Number.parseInt($('#money-input').value / NUMBER.LOTTO_PRICE, 10);
    return this.buyRandomLottos(lottosCount);
  }

  buyRandomLottos(lottoCount) {
    $('#money-input').value = '';
    const lottoPublisher = new LottoPublisher(lottoCount, []);
    const lottos = lottoPublisher.publishLottos();
    const lottoNumbers = lottoPublisher.lottoNumbers;
    return [lottos, lottoNumbers];
  }

  // TODO:분리필요
  //VIEW RENDER 로직 분리 필요
  showLottosInfo(lottoCount, lottosNumbers) {
    $('#my-lottos-section').classList.remove('hidden');
    $('#winning-lotto-section').classList.remove('hidden');

    const lottosTicketsHTML = lottosNumbers.map((numbers) => {
      const formattedNumbers = numbers.join(', ');
      return `<li><span>🎟️</span>${formattedNumbers}</li>`;
    });
    $('#my-lottos-count').innerText = `총 ${lottoCount}개를 구매하였습니다.`;
    $('#my-lottos-list').innerHTML = lottosTicketsHTML.join('');
    $('.number-input').focus();
  }

  getWinLottoNumbers() {
    const numberInputs = [...$$('.number-input')];
    const bonusNumberInput = numberInputs.splice(-1, 1);
    const winNumbers = numberInputs.reduce((numbers, input) => {
      numbers.push(Number(input.value));
      return numbers;
    }, []);
    const bonusNumber = Number(bonusNumberInput.value);
    return [winNumbers, bonusNumber];
  }

  async makeValidateWinLotto(winNumbers, bonusNumber) {
    let winLotto;
    try {
      const lottoWithWinNumbers = new Lotto(winNumbers);
      winLotto = new WinLotto(lottoWithWinNumbers, bonusNumber);
    } catch ({ message }) {
      WebOutputView.printError($('#win-lotto-error'), message);
    }
    return winLotto;
  }
}
export default LottoWebController;
